use crate::cache::redis::RedisConnection;
use std::ops::Deref;
use rocket::http::Status;
use rocket::response::status::Custom;
use crate::fetch_data;
use crate::guards::Verified;


#[get("/stundenplan/<stufe>")]
pub fn get_stundenplan(connection: RedisConnection,
                       stufe: String,
                       schueler_creds: Verified) -> Custom<&'static str> {
    let connection = connection.0.deref();
    let schueler_creds = schueler_creds.0;

    // todo check if already cached

    let is_member = fetch_data::stufen::is_stufe(connection, stufe, schueler_creds);

    if is_member.is_err() {
        return Custom(Status::InternalServerError, is_member.unwrap_err());
    }
    let is_member = is_member.unwrap();

    if !is_member {
        return Custom(Status::BadRequest, "Stufe not found");
    }

    // todo fetch and cache

    return Custom(Status::NotImplemented, "NIY");
}