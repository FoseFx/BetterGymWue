extern crate redis;
extern crate reqwest;

use redis::RedisResult;
use std::error::Error;

static CACHE_TIME: u32 = 42 * 60 * 60;
static SESSION_REDIS_KEY: &str = "verified_logins";
static INVALID_SESSION_REDIS_KEY: &str = "invalid_logins";

// checks if these values are already in the cache
// 0 = not cached, 1 = cached and valid, 2 = cached but invalid
pub fn test_cache(connection: &redis::Connection, mode: &String, creds: &String) -> u8 {

    // check if cached as valid

    let get_res: RedisResult<u8> = redis::cmd("SISMEMBER")
        .arg(SESSION_REDIS_KEY)
        .arg(
            format!("{}:{}", mode, creds)
        )
        .query(connection);

    if get_res.is_err() {
        println!("TEST_CHACHE(): REDIS ERROR{}", get_res.unwrap());
        return 0;
    }

    if get_res.unwrap() == 1 {
        return 1;
    }

    // check if cached as invalid

    let get_res: RedisResult<u8> = redis::cmd("SISMEMBER")
        .arg(SESSION_REDIS_KEY)
        .arg(
            format!("{}:{}", mode, creds)
        )
        .query(connection);

    if get_res.is_err() {
        println!("TEST_CHACHE(): REDIS ERROR{}", get_res.unwrap());
        return 0;
    }

    if get_res.unwrap() == 1 {
        return 2;
    } else {
        return 0;
    }

}

pub fn add_to_cache(connection: &redis::Connection, mode: &String, creds: &String, is_valid: bool) {

    let key = match is_valid {
        true => SESSION_REDIS_KEY,
        false => INVALID_SESSION_REDIS_KEY
    };

    let sadd_res: RedisResult<bool> = redis::cmd("SADD")
        .arg(key)
        .arg(
            format!("{}:{}", mode, creds)
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

pub fn is_valid(mode: &String, creds: &String) -> Result<bool, Box<Error>> {

    let resp: String = reqwest::get(&format!("http://FETCH_BACKEND:8001/auth/{}/{}", mode, creds))?.text()?;
    println!("AUTH_RESP: {}", resp);
    return Ok(true);

}