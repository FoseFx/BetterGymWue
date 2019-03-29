#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use] extern crate rocket;
#[macro_use] extern crate rocket_contrib;
#[macro_use] extern crate serde_derive;

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

#[get("/")]
fn index(connection: RedisConnection) -> String {

    let connection = connection.0.deref();
    return fetch_data::fetch(format!("posts"), connection).unwrap();

}


#[derive(Deserialize)]
#[derive(Debug)]
struct TokenRequestData {
    username: String,
    password: String
}

#[post("/token", data = "<data>")]
fn post_get_session_token(data: Json<TokenRequestData>, connection: RedisConnection) -> &'static str {

    let connection = connection.0.deref();

    let already_cached = sessions::test_cache(
        connection,
        &data.username,
        &data.password
    );

    if already_cached == 1 {
        return "Ok";
    }

    let is_valid_res= sessions::is_valid(&data.username, &data.password);

    let is_valid = !is_valid_res.is_err();

    if is_valid {
        sessions::add_to_cache(
            connection,
            &data.username,
            &data.password
        );

        return "Ok";
    }

    return "401";
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