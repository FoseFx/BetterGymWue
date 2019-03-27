#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use] extern crate rocket;
extern crate redis;

mod fetch_data;

use rocket::Request;

#[get("/")]
fn index() -> &'static str {
    "Hello, world!"
}

fn main() {
    println!("{:#?}", fetch_data::fetch_data::fetch(format!("posts")));

    rocket::ignite().mount("/", routes![
        index
    ]).launch();
}