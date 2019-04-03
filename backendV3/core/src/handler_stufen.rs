use crate::cache::redis::RedisConnection;
use std::ops::Deref;
use rocket::http::Status;
use rocket::response::status::Custom;
use crate::guards::Verified;
use crate::fetch_data;

#[get("/stufen")]
pub fn get_stufen(connection: RedisConnection, verified: Verified) -> Custom<String> {
    let connection = connection.0.deref();
    let creds = verified.0;

    let stufen = fetch_data::stufen::get_stufen(connection, creds);
    let stufen_len = stufen.len(); // 0 when connection failed

    if stufen_len != 0 {
        return Custom(Status::Ok, json!(stufen).to_string());
    }

    return Custom(Status::InternalServerError, format!("Stufen nicht abrufbar"));
}
