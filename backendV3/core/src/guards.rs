use crate::JwtSecret;
use rocket::http::{Status, Cookie};
use rocket::request::FromRequest;
use rocket::State;
use rocket::{Outcome, Request};
use frank_jwt::{decode, Algorithm};
use rocket::outcome::Outcome::{Success, Failure};

#[derive(Debug)]
pub struct Verified(pub String);

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