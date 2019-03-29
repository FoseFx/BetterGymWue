extern crate redis;
extern crate reqwest;

use redis::RedisResult;
use std::error::Error;

static CACHE_TIME: u32 = 42 * 60 * 60;
static SESSION_REDIS_KEY: &str = "verified_logins";

// checks if these values are already in the cache
// 0 = false, 1 = true, 2 = redis error
pub fn test_cache(connection: &redis::Connection, username: &String, password: &String) -> u8 {

    let get_res: RedisResult<u8> = redis::cmd("SISMEMBER")
        .arg(SESSION_REDIS_KEY)
        .arg(
            format!("{}:{}", username, password)
        )
        .query(connection);

    if get_res.is_err() {
        println!("TEST_CHACHE(): REDIS ERROR{}", get_res.unwrap());
        return 2;
    }

    return get_res.unwrap();

}

pub fn add_to_cache(connection: &redis::Connection, username: &String, password: &String) {
    let sadd_res: RedisResult<bool> = redis::cmd("SADD")
        .arg(SESSION_REDIS_KEY)
        .arg(
            format!("{}:{}", username, password)
        )
        .query(connection);

    if sadd_res.is_err() {
        println!("ADD_TO_CACHE(): REDIS_ERROR(SADD): {}", sadd_res.unwrap());
    }

    let exp_res: RedisResult<bool> = redis::cmd("EXPIRE") // reset this every time a new validation is in
        .arg(SESSION_REDIS_KEY)
        .arg(CACHE_TIME)
        .query(connection);

    if exp_res.is_err() {
        println!("ADD_TO_CACHE(): REDIS_ERROR(EXPIRE): {}", exp_res.unwrap());
    }



}

pub fn is_valid(username: &String, password: &String) -> Result<bool, Box<Error>> {

    let _resp: String = reqwest::get(&format!("http://FETCH_BACKEND/{}/{}", username, password))?.text()?;

    return Ok(true);

}