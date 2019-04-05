use crate::cache::redis::RedisConnection;
use std::ops::Deref;
use regex::Regex;
use rocket::http::Status;
use rocket::response::status::Custom;


#[get("/stundenplan/<stufe>")]
pub fn get_stundenplan(connection: RedisConnection, stufe: String) -> Custom<&'static str> {
    let _connection = connection.0.deref();

    let regex = Regex::new(r"^[a-zA-Z0-9-]+$").unwrap(); // Stufe must match this
    let is_valid = regex.is_match(&stufe);

    if !is_valid {
        return Custom(Status::BadRequest, "Nicht als Stufe erkannt");
    }

    return Custom(Status::NotImplemented, "NIY");
}