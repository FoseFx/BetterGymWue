#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use] extern crate rocket;
#[macro_use] extern crate rocket_contrib;
#[macro_use] extern crate serde_derive;
#[macro_use] extern crate serde_json;
extern crate frank_jwt;

extern crate redis;
extern crate r2d2;
extern crate r2d2_redis;
use std::ops::Deref;

mod cache;
mod fetch_data;
mod sessions;

// use rocket::Request;
use cache::redis::RedisConnection;
use rocket_contrib::json::Json;
use frank_jwt::{Algorithm, encode, decode};



static SECRET: &str = "secret123";



#[get("/")]
fn index(connection: RedisConnection) -> String {

    let connection = connection.0.deref();
    return fetch_data::fetch(format!("posts"), connection).unwrap();

}


#[derive(Deserialize)]
#[derive(Debug)]
struct TokenRequestData {
    mode: String, // either 'schueler' or 'lehrer'
    creds: String // btob of username:password
}

#[post("/token", data = "<data>")]
fn post_get_session_token(data: Json<TokenRequestData>, connection: RedisConnection) -> String {


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
    let jwt = encode(header, &SECRET.to_string(), &payload, Algorithm::HS256).unwrap();


    if already_cached == 1 {
        return jwt;
    } else if already_cached == 2 {
        return format!("401");
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
        return jwt;
    } else {
        return format!("401");
    }

}

fn main() {

    rocket::ignite()
        .manage(cache::redis::pool())
        .mount("/v3", routes![
            index,
            post_get_session_token
        ])
        .launch();

}