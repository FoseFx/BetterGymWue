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



pub mod stufen {
    use redis::RedisResult;
    use crate::redis::Commands;
    use std::ops::Deref;

    static KEY: &str = "stufen";

    pub fn get_stufen(connection: &redis::Connection, creds: String) -> Vec<String> {

        let cache_res = try_cache(connection);

        if cache_res.is_ok() {
            let cache_data = cache_res.unwrap();
            if cache_data.len() == 0 { // key not found
                let fetched_stufen = fetch_stufen(creds);
                if fetched_stufen.len() != 0 {
                    cache(connection, &fetched_stufen);
                }
                return fetched_stufen;
            }
            return cache_data;
        }
        println!("Redis error: {:?}", cache_res);
        // cache connection failed
        return vec![];
    }

    /** empty when not found */
    fn try_cache(connection: &redis::Connection) -> RedisResult<Vec<String>>{
        return connection.smembers(KEY);
    }

    /** empty when failed */
    fn fetch_stufen(creds: String) -> Vec<String> {

        return vec![]; // todo
    }

    fn cache(connection: &redis::Connection, values: &Vec<String>){
        let push_res: RedisResult<u8> = connection.sadd(KEY, values.deref());
        if push_res.is_err() {
            println!("Error caching stufen: {:?}", &push_res);
        }

        println!("Total of {} items cached", push_res.unwrap());

        let expire_res: RedisResult<u8> = connection.expire(KEY, 60*24*4);
        if expire_res.is_err() {
            println!("Error expiring stufen: {:?}", &expire_res);
        }
    }

}