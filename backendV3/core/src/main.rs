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
use std::env::vars;

mod cache;
mod fetch_data;
mod sessions;
mod handler_token;
mod handler_stundenplaene;

// use rocket::Request;
use cache::redis::RedisConnection;


pub struct JwtSecret(String);


#[get("/")]
fn index(connection: RedisConnection) -> String {

    let connection = connection.0.deref();
    return fetch_data::fetch(format!("posts"), connection).unwrap();

}


fn main() {

    /*
        Obtain JWT Secret environment variable
    */
    let mut jwt_secret: Option<String> = None;
    for (env_key, val) in vars(){
        if env_key == "JWT_SECRET" {
            jwt_secret = Some(val);
        }
    }

    if jwt_secret.is_none() {
        panic!("No JWT_SECRET set");
    }
    
    let jwt_secret = jwt_secret.unwrap();
    let last_index = jwt_secret.len() - 1;

    /* Print jwt secret */
    print!("\n🔐  \u{1b}[0m\u{1b}[31;1mJWT_SECRET: ");
    for (i, part) in jwt_secret.chars().enumerate() {
        if i == 0 || i == last_index {
            print!("{}", part);
        } else {
            print!("*");
        }
    }
    println!(" \u{1b}[0m");

    let jwt_secret: JwtSecret = JwtSecret(jwt_secret);

    

    /*
        Mount and launch rocket web server
    */

    rocket::ignite()
        .manage(cache::redis::pool())
        .manage(jwt_secret)
        .mount("/v3", routes![
            index,
            handler_token::post_get_session_token_data,
            handler_token::post_get_session_token_cookie,
            handler_stundenplaene::get_stundenplan
        ])
        .launch();

}