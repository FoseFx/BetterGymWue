extern crate redis;
extern crate reqwest;

use redis::{Commands, RedisResult};
use std::error::Error;

static CACHE_TIME: i8 = 10;

pub fn fetch(key: String, redis_conn: &redis::Connection) -> Result<String, String> {

    let cache = get_cached_data(&key, redis_conn);

    if cache.is_ok() {
        let res = cache.unwrap();
        println!("Cache hit");
        return Ok(res);

    } else {

        println!("No cache hit");

        let net_result = do_request(&key);

        if net_result.is_ok(){
            println!("Net req was ok");
            let ctd = net_result.unwrap();
            cache_value(redis_conn, &key, &ctd);
            return Ok(ctd);

        } else {
            println!("Net req failed");
            return Err(format!("{}", net_result.unwrap()));
        }


    }

}

fn get_cached_data(key: &String, con: &redis::Connection) -> redis::RedisResult<String> {

    return con.get(&key[..]);

}

fn do_request(key: &String) -> Result<String, Box<Error>>{

    let resp: String = reqwest::get(&format!("https://jsonplaceholder.typicode.com/{}", key))?.text()?;
    return Ok(resp);

}

fn cache_value(conn: &redis::Connection, key: &String, value: &String){

    let set_res: RedisResult<String> = conn.set(&key[..], &value[..]);

    let exp_res: RedisResult<i16> = redis::cmd("EXPIRE").arg(&key[..]).arg(CACHE_TIME).query(conn);

    set_res.expect(&format!("Could not set key: {}, value: {}", &key[..], &value[..])[..]);
    exp_res.expect(&format!("Could not expire key {}", key)[..]);

}
