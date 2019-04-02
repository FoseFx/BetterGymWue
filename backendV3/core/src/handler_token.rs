use frank_jwt::{encode, Algorithm, decode};
use rocket::response::status;
use rocket::http::Status;
use crate::{sessions, JwtSecret};
use rocket::State;
use crate::cache::redis::RedisConnection;
use rocket_contrib::json::Json;
use std::ops::Deref;
use rocket::http::Cookie;


#[derive(Deserialize)]
#[derive(Debug)]
pub struct TokenRequestData {
    mode: String, // either 'schueler' or 'lehrer'
    creds: String // btob of username:password
}

#[post("/token", data = "<data>")]
pub fn post_get_session_token_data(data: Json<TokenRequestData>,
                          connection: RedisConnection,
                          jwt_secret: State<JwtSecret>, mut cookies: rocket::http::Cookies) -> status::Custom<&'static str> {

    let connection = connection.0.deref();

    let already_cached = sessions::test_cache(
        connection,
        &data.mode,
        &data.creds
    );

    println!("{}", already_cached);


    let payload = json!({
        "mode": &data.mode,
        "creds": &data.creds
    });

    let header = json!({});
    let jwt = encode(header, &jwt_secret.0, &payload, Algorithm::HS256).unwrap();
    let jwt_cookie = rocket::http::Cookie::build("token", jwt)
        .http_only(true)
        .secure(true)
        .finish();

    if already_cached == 1 {
        cookies.add(jwt_cookie);
        return status::Custom(Status::Ok, "Ok");
    } else if already_cached == 2 {
        return status::Custom(Status::Unauthorized, "401");
    }

    let is_valid_res= sessions::is_valid(&data.mode, &data.creds);

    if is_valid_res.is_err() {
        return status::Custom(Status::InternalServerError, "Failed fetching data");
    }

    let is_valid = is_valid_res.unwrap();

    sessions::add_to_cache(
        connection,
        &data.mode,
        &data.creds,
        is_valid
    );

    if is_valid {
        cookies.add(jwt_cookie);
        return status::Custom(Status::Ok, "Ok");
    } else {
        return status::Custom(Status::Unauthorized, "401");
    }

}

#[post("/token_cookie")]
pub fn post_get_session_token_cookie(
    connection: RedisConnection,
    jwt_secret: State<JwtSecret>,
    mut cookies: rocket::http::Cookies
) -> status::Custom<&'static str> {

    let connection = connection.0.deref();

    let token_cookie = cookies.get("token");

    if token_cookie.is_none() {
        return status::Custom(Status::Unauthorized, "No Data or cookie provided");
    }

    let token_cookie = token_cookie.unwrap();
    let token_cookie_string = token_cookie.value();
    let token_jwt = decode(&format!("{}", token_cookie_string), &format!("{}", jwt_secret.0), Algorithm::HS256);

    if token_jwt.is_err() {
        cookies.remove(Cookie::named("token"));
        return status::Custom(Status::Unauthorized, "Token expired/invalid");
    }

    let token_jwt: serde_json::Value = token_jwt.unwrap().1;

    let mode= token_jwt.get("mode").unwrap().as_str().unwrap().to_string();
    let creds = token_jwt.get("creds").unwrap().as_str().unwrap().to_string();

    let payload = json!({
        "mode": &mode,
        "creds": &creds
    });

    let header = json!({});
    let jwt = encode(header, &jwt_secret.0, &payload, Algorithm::HS256).unwrap();
    let jwt_cookie = rocket::http::Cookie::build("token", jwt)
        .http_only(true)
        .secure(true)
        .finish();

    let is_cached = sessions::test_cache(connection, &mode, &creds);

    if is_cached == 1 {
        cookies.add(jwt_cookie);
        return status::Custom(Status::Ok, "Ok");
    }

    if is_cached == 2 {
        cookies.remove(Cookie::named("token"));
        return status::Custom(Status::Unauthorized, "Logindaten abgelaufen");
    }


    let is_valid_res = sessions::is_valid(&mode, &creds);

    let err = is_valid_res.is_err();

    if err {
        return status::Custom(Status::InternalServerError, "Could not fetch data");
    }

    let is_valid = is_valid_res.unwrap();

    sessions::add_to_cache(connection, &mode, &creds, is_valid);

    if is_valid {
        cookies.add(jwt_cookie);
        return status::Custom(Status::Ok, "Ok");
    }

    cookies.remove(Cookie::named("token"));
    return status::Custom(Status::Unauthorized, "Not Implemented yet");

}