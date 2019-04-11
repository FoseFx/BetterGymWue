extern crate redis;
extern crate reqwest;

use redis::RedisResult;
use std::error::Error;
use regex::Regex;
use crate::redis::Commands;

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
        .arg(key)
        .arg(CACHE_TIME)
        .query(connection);

    if exp_res.is_err() {
        println!("ADD_TO_CACHE(): REDIS_ERROR(EXPIRE): {}", exp_res.unwrap());
    }



}

pub fn is_valid(conn: &redis::Connection, mode: &String, creds: &String) -> Result<bool, String> {

    let url = match &mode[..] {
        "schueler" => crate::urls::schueler::auth_url(),
        _ => crate::urls::lehrer::auth_url()
    };

    let http = reqwest::Client::new();

    let result = http
        .get(&url[..])
        .header("Authorization", format!("Basic {}", creds))
        .send();

    if result.is_err() {
        let err = result.unwrap_err();
        return Err(
            format!("Server Verbindung fehlgeschlagen: {:?} {}", err.status(), err.description())
        );
    }
    let mut result = result.unwrap();

    if !result.status().is_success() {
        println!("Server Verbindung fehlgeschlagen: {}", result.status().as_u16());
        return Ok(false);
    }

    let text = result.text();

    if text.is_err(){
        return Err(
            format!("Der Server hat mit keiner Verwertbaren Antwort reagiert")
        );
    }

    let text = text.unwrap().replace("\n", "").replace("\t", "");
    let text = Regex::new(r" +").unwrap().replace_all(&text, " ");

    let regex = Regex::new("<option value=\"(\\d{2})\">\\d+\\.\\d+.\\d+</option><option value=\"(\\d{2})\">\\d+\\.\\d+.\\d+</option> </select>").unwrap();

    let captures = regex.captures(&text[..]).unwrap();

    let wochen =
        format!(
            "{},{}",
            captures.get(1).unwrap().as_str(),
            captures.get(2).unwrap().as_str()
        );


    let redis_res: RedisResult<bool> = conn.set("wochen", wochen);
    if redis_res.is_err(){
        return Err(redis_res.unwrap_err().to_string());
    }

    println!("redisres: {:?}", redis_res);
    return Ok(true);
}