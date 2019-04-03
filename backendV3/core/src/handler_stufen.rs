use crate::cache::redis::RedisConnection;
use std::ops::Deref;
use crate::{fetch_data, JwtSecret};
use regex::Regex;
use rocket::http::{Status, Cookie};
use rocket::response::status::Custom;
use rocket::request::FromRequest;
use rocket::{request, State};
use rocket::{Outcome, Request};
use rocket::outcome::IntoOutcome;
use frank_jwt::{decode, Algorithm};
use rocket::outcome::Outcome::{Success, Failure};


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


pub struct Verified(String);

impl<'a, 'r> FromRequest<'a, 'r> for Verified {
    type Error = ();

    fn from_request(request: &'a Request<'r>) -> Outcome<Self, (Status, Self::Error), ()> {
        let secret = &request.guard::<State<JwtSecret>>().unwrap().0;

        let mut cookies = request.cookies();
        let token_res = cookies.get("token");
        if token_res.is_some() {
            let content = token_res.unwrap().value().to_string();
            let jwt_res = decode(&content, secret, Algorithm::HS256);
            if jwt_res.is_ok() {
                let token: serde_json::Value = jwt_res.unwrap().1;
                let creds = token.get("creds").unwrap().as_str().unwrap().to_string();
                return Success(Verified(creds));
            }
            cookies.remove(Cookie::named("token"));
        }
        return Failure((Status::Unauthorized, ()));
    }
}