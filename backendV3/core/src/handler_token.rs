use frank_jwt::{encode, Algorithm, decode};
use rocket::response::status;
use rocket::http::Status;
use crate::{sessions, JwtSecret, is_expired};
use rocket::State;
use crate::cache::redis::RedisConnection;
use rocket_contrib::json::{Json, JsonValue};
use std::ops::Deref;
use rocket::http::Cookie;
use crate::guards::Verified;
use rocket::response::status::Custom;
use chrono::{Utc, Duration};

/*

JWT:
{}, // default header
{
    exp: one Week in UNIX from iat,
    age: number,
    schueler?: btoa(user:pass),
    lehrer?: btoa(user:pass),
},
SIGN


*/

#[derive(Deserialize)]
#[derive(Debug)]
pub struct TokenRequestData {
    creds: String // btob of username:password
}

#[post("/schueler_token", data = "<data>")]
pub fn post_schueler_token(
    data: Json<TokenRequestData>,
    connection: RedisConnection,
    jwt_secret: State<JwtSecret>,
    mut cookies: rocket::http::Cookies) -> status::Custom<&'static str> {

    let connection = connection.0.deref();

    let jwt_secret: &String = &jwt_secret.0;

    return get_session_token(connection, cookies, jwt_secret, "schueler", &data.creds);

}

#[post("/lehrer_token", data = "<data>")]
pub fn post_lehrer_token(
    data: Json<TokenRequestData>,
    connection: RedisConnection,
    jwt_secret: State<JwtSecret>,
    verified: Verified,
    mut cookies: rocket::http::Cookies) -> status::Custom<&'static str> {

    let connection = connection.0.deref();

    let jwt_secret: &String = &jwt_secret.0;

    return get_session_token(connection, cookies, jwt_secret, "lehrer", &data.creds);

}

fn get_session_token (
    connection: &redis::Connection,
    mut cookies: rocket::http::Cookies,
    jwt_secret: &String,
    mode: &str,
    creds: &String
) -> status::Custom<&'static str> {


    let already_cached = sessions::test_cache(
        connection,
        &mode.to_string(),
        creds
    );

    println!("{}", already_cached);

    // note: this will clear existing values in the JWT
    let (payload, exp) = gen_new_payload_and_exp(mode, creds, jwt_secret, &cookies);

    let header = json!({});
    let jwt = encode(header, jwt_secret, &payload, Algorithm::HS256).unwrap();
    let jwt_cookie = rocket::http::Cookie::build("token", jwt)
        .http_only(true)
        .secure(true)
        .expires(time::at_utc(time::Timespec::new(exp, 0)))
        .finish();

    if already_cached == 1 {
        cookies.add(jwt_cookie);
        return status::Custom(Status::Ok, "Ok");
    } else if already_cached == 2 {
        return status::Custom(Status::Unauthorized, "401");
    }

    let is_valid_res= sessions::is_valid(&mode.to_string(), creds);

    if is_valid_res.is_err() {
        return status::Custom(Status::InternalServerError, "Failed fetching data");
    }

    let is_valid = is_valid_res.unwrap();

    sessions::add_to_cache(
        connection,
        &mode.to_string(),
        creds,
        is_valid
    );

    if is_valid {
        cookies.add(jwt_cookie);
        return status::Custom(Status::Ok, "Ok");
    } else {
        return status::Custom(Status::Unauthorized, "401");
    }

}

/** returns new payload and the new unix time it expires on*/
fn gen_new_payload_and_exp(mode: &str, value: &String, jwt_secret: &String, cookies: &rocket::http::Cookies) -> (serde_json::Value, i64) {

    let now = Utc::now();
    let exp = now.checked_add_signed(Duration::weeks(1)).unwrap();
    let exp = exp.timestamp();

    let fallback = (json!({
        "exp": exp,
        mode: value
    }), exp);

    //
    // get cookie
    //
    let token_c = cookies.get("token");
    if token_c.is_none() {
        return fallback;
    }
    let token_str = token_c.unwrap().value();

    //
    // get jwt payload
    //
    let jwt = decode(&token_str.to_string(), jwt_secret, Algorithm::HS256);
    if jwt.is_err() {
        return fallback;
    }
    let mut old_payload: serde_json::Value  = jwt.unwrap().1;
    if is_expired(&old_payload){
        return fallback;
    }
    let payload = old_payload.as_object_mut().unwrap();

    //
    // modify payload
    //
    payload.insert(mode.to_string(), serde_json::Value::String(value.to_string())); // mode => value
    payload.insert("exp".to_string(), json!(exp)); // exp => exp


    return (serde_json::Value::Object(payload.to_owned()), exp);
}

#[post("/refresh_token")]
pub fn post_refresh_token(mut cookies: rocket::http::Cookies, jwt_secret: State<JwtSecret>) -> Custom<&'static str>{

    let jwt_secret: &String = &jwt_secret.0;

    let token_res = cookies.get("token");

    if token_res.is_none(){
        return Custom(Status::Unauthorized, "Nothing to refresh");
    }

    let token = token_res.unwrap().value().to_string();
    let decoded = decode(&token, jwt_secret, Algorithm::HS256);

    if decoded.is_err(){
        return Custom(Status::Unauthorized, "Token not valid or expired. Please log in again.");
    }

    let mut payload: serde_json::Value = decoded.unwrap().1;
    let pl_hm = payload.as_object_mut().unwrap();

    // todo block old ages
    // todo re-verify creds

    let exp = Utc::now().checked_add_signed(Duration::weeks(1)).unwrap().timestamp();
    pl_hm.insert("exp".to_string(), json!(exp));

    let ret_payload = json!(pl_hm);
    let ret_token = encode(json!({}), jwt_secret, &ret_payload, Algorithm::HS256);

    if ret_token.is_err(){
        println!("Error encoding token: {:?}", ret_token);
        return Custom(Status::InternalServerError, "Internal Server Error");
    }

    cookies.add(
        Cookie::build("token", ret_token.unwrap())
            .secure(true)
            .http_only(true)
            .expires(time::at_utc(time::Timespec::new(exp, 0)))
            .finish()
    );

    return Custom(Status::Ok, "Ok");
}