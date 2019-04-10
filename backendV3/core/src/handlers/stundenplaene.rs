use crate::cache::redis::RedisConnection;
use std::ops::Deref;
use rocket::http::Status;
use rocket::response::status::Custom;
use crate::{fetch_data, truncate};
use crate::guards::Verified;


#[get("/stundenplan/<stufe>")]
pub fn get_stundenplan(connection: RedisConnection,
                       stufe: String,
                       schueler_creds: Verified) -> Custom<String> {
    let connection = connection.0.deref();
    let schueler_creds = schueler_creds.0;

    //
    // sanitize
    //
    let re = regex::Regex::new(r"[^\w\d]").unwrap();
    let stufe = truncate(re.replace_all(stufe.as_str(), "").deref(), 10).to_string().to_uppercase();
    println!("stufe: '{}'", stufe);


    // check if already cached
    let cache = fetch_data::stundenplan::get_cache(connection, &stufe);
    if cache.is_ok() {
        return Custom(Status::Ok, cache.unwrap());
    }
    // its not

    // is the stufe bs or valid?
    let is_member = fetch_data::stufen::is_stufe(connection, &stufe, &schueler_creds);

    if is_member.is_err() {
        return Custom(Status::InternalServerError, is_member.unwrap_err().to_string());
    }
    let is_member = is_member.unwrap();

    if !is_member { // stufe is bs.
        return Custom(Status::BadRequest, "Stufe not found".to_string());
    }
    // stufe is valid

    let stufe_id = format!("00021"); // todo stufe_id

    let sp_res = fetch_data::stundenplan::fetch(connection, stufe, stufe_id, schueler_creds);
    println!("sp res: {:?}", sp_res);

    if sp_res.is_ok() {
        return Custom(Status::Ok, sp_res.unwrap());
    }

    return Custom(Status::BadRequest, sp_res.unwrap_err());
}