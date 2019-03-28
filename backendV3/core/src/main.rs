#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use] extern crate rocket;
extern crate redis;
extern crate r2d2;
extern crate r2d2_redis;
use std::ops::Deref;

mod cache;
mod fetch_data;

// use rocket::Request;
use cache::redis::RedisConnection;

#[get("/")]
fn index(connection: RedisConnection) -> String {



    let connection = connection.0.deref();
    return fetch_data::fetch(format!("posts"), connection).unwrap();

}

fn main() {

    rocket::ignite()
        .manage(cache::redis::pool())
        .mount("/v3", routes![
            index
        ])
        .launch();

}