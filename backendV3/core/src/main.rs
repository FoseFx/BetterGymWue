#![feature(proc_macro_hygiene, decl_macro)]

mod cache;
mod fetch_data;
mod sessions;
mod handlers;
mod urls;

mod guards;
#[macro_use] extern crate rocket;
extern crate rocket_contrib;
#[macro_use] extern crate serde_derive;
#[macro_use] extern crate serde_json;
extern crate frank_jwt;
extern crate chrono;
extern crate time;

extern crate redis;
extern crate r2d2;
extern crate r2d2_redis;
use std::ops::Deref;
use std::env::vars;
use cache::redis::RedisConnection;
use chrono::{Utc, Duration, DateTime, NaiveDateTime};
use frank_jwt::{decode, Algorithm};


// use rocket::Request;


pub struct JwtSecret(String);


#[get("/")]
fn index(connection: RedisConnection) -> String {

    let connection = connection.0.deref();
    return fetch_data::fetch(format!("posts"), connection).unwrap();

}


fn main() {

    let jwt_secret = obtain_jwt_secret();

    /*
        Mount and launch rocket web server
    */

    rocket::ignite()
        .manage(cache::redis::pool())
        .manage(jwt_secret)
        .mount("/v3", routes![
            index,
            handlers::token::post_schueler_token,
            handlers::token::post_lehrer_token,
            handlers::token::post_refresh_token,
            handlers::stundenplaene::get_stundenplan,
            handlers::stufen::get_stufen
        ])
        .launch();

}

fn obtain_jwt_secret() -> JwtSecret {
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
    return jwt_secret;
}

fn is_expired(payload: &serde_json::Value) -> bool {
    let old_exp: i64 = payload.get("exp").unwrap().as_i64().unwrap();
    let as_date: DateTime<Utc> = DateTime::<Utc>::from_utc(NaiveDateTime::from_timestamp(old_exp, 0), Utc);
    let now: DateTime<Utc> = Utc::now();

    let diff: Duration = as_date.signed_duration_since(now);
    println!("now: {} exp: {}, diff: {}", now, as_date, diff.num_seconds());
    return diff.num_seconds() <= 0;
}

pub fn verify_jwt(cookie: &rocket::http::Cookie, secret: &String) -> Result<serde_json::Value, &'static str> {

    let content = cookie.value().to_string();
    let jwt_res = decode(&content, secret, Algorithm::HS256);

    if jwt_res.is_err(){
        return Err("Token not valid");
    }

    let payload: serde_json::Value = jwt_res.unwrap().1;
    if is_expired(&payload){
        return Err("Token expired");
    }

    return Ok(payload);

}

pub fn truncate(s: &str, max_chars: usize) -> &str {
    match s.char_indices().nth(max_chars) {
        None => s,
        Some((idx, _)) => &s[..idx],
    }
}