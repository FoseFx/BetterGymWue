use crate::{JwtSecret, verify_jwt};
use rocket::http::{Status, Cookie};
use rocket::request::FromRequest;
use rocket::State;
use rocket::{Outcome, Request};
use rocket::outcome::Outcome::{Success, Failure};
use serde_json::Value;

#[derive(Debug)]
pub struct Verified(pub String);

impl<'a, 'r> FromRequest<'a, 'r> for Verified {
    type Error = ();

    fn from_request(request: &'a Request<'r>) -> Outcome<Self, (Status, Self::Error), ()> {
        let secret: &String = &request.guard::<State<JwtSecret>>().unwrap().0;
        let mut cookies = request.cookies();
        let token_res = cookies.get("token");
        if token_res.is_some() {

            let payload: Result<Value, &str> = verify_jwt(token_res.unwrap(), secret);
            if payload.is_err() {
                println!("JWT Error: {:?}", &payload);
                cookies.remove(Cookie::named("token"));
                return Failure((Status::Unauthorized, ()));
            }
            return Success(
                Verified(
                    payload.unwrap()
                        .get("schueler")
                        .unwrap()
                        .as_str()
                        .unwrap()
                        .to_string()
                )
            );


        }
        return Failure((Status::Unauthorized, ()));
    }
}