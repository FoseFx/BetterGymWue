use frank_jwt::{encode, Algorithm};
use rocket::response::status;
use rocket::http::Status;
use crate::{sessions, JwtSecret};
use rocket::State;
use crate::cache::redis::RedisConnection;
use rocket_contrib::json::Json;
use std::ops::Deref;


#[derive(Deserialize)]
#[derive(Debug)]
pub struct TokenRequestData {
    mode: String, // either 'schueler' or 'lehrer'
    creds: String // btob of username:password
}

#[post("/token", data = "<data>")]
pub fn post_get_session_token(data: Json<TokenRequestData>,
                          connection: RedisConnection,
                          jwt_secret: State<JwtSecret>) -> status::Custom<String> {


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


    if already_cached == 1 {
        return status::Custom(Status::Ok, jwt);
    } else if already_cached == 2 {
        return status::Custom(Status::Unauthorized, format!("401"));
    }

    let is_valid_res= sessions::is_valid(&data.mode, &data.creds);


    let mut is_valid = !is_valid_res.is_err();

    if !is_valid {
        println!("Error: {}", is_valid_res.err().unwrap().to_string());
    } else {
        is_valid = is_valid_res.unwrap();
    }

    sessions::add_to_cache(
        connection,
        &data.mode,
        &data.creds,
        is_valid
    );

    if is_valid {
        return status::Custom(Status::Ok, jwt);
    } else {
        return status::Custom(Status::Unauthorized, format!("401"));
    }

}