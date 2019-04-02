use crate::cache::redis::RedisConnection;
use std::ops::Deref;
use crate::fetch_data;
use regex::Regex;
use rocket::http::Status;
use rocket::response::status::Custom;
use rocket::request::FromRequest;
use rocket::{Outcome, Request};
use rocket::outcome::IntoOutcome;
use frank_jwt::{decode, Algorithm};


#[get("/stufen")]
pub fn get_stufen(connection: RedisConnection, verified: Verified) -> Custom<String> {
    let connection = connection.0.deref();

    let stufen = fetch_data::stufen::get_stufen(connection, format!(""));
    let stufen_len = stufen.len(); // 0 when connection failed

    if stufen_len != 0 {
        return Custom(Status::Ok, json!(stufen).to_string());
    }

    return Custom(Status::InternalServerError, format!("Stufen nicht abrufbar"));
}


struct Verified {

}

impl<'a, 'r> FromRequest<'a, 'r> for Verified {
    type Error = ();

    fn from_request(request: &'a Request<'r>) -> Outcome<Self, (Status, Self::Error), ()> {
        return request.cookies()
            .get("token")
            .and_then(|cookie| cookie.value().parse().ok())
            .and_then(|jwt| decode(jwt, JWT_SECRET, Algorithm::HS256).ok())
            .or_forward(());
    }
}