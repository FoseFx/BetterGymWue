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

    pub fn get_stufen(connection: &redis::Connection, creds: &String) -> Vec<String> {

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
    fn fetch_stufen(creds: &String) -> Vec<String> {
        let client = reqwest::Client::new();
        let req_res = client.get("https://gymnasium-wuerselen.de/untis/Schueler-Stundenplan/frames/navbar.htm")
            .header(reqwest::header::AUTHORIZATION, format!("Basic {}", creds))
            .send();

        if req_res.is_err() {
            println!("Request error tred fetching stufen: {:?}", req_res);
            return vec![];
        }
        let text = req_res.unwrap().text().unwrap();
        let split: Vec<&str> = text.split("var classes = [\"").collect(); // var classes = ["abc", "def"];
        let important_part: Vec<&str> = split[1].split("\"];").collect();
        let important_part: &str = important_part[0];
        let as_vec: Vec<&str> = important_part.split("\",\"").collect();

        let mut string_vec: Vec<String> = vec![];
        for s in as_vec.iter(){
            string_vec.push(s.to_string());
        }

        return string_vec;
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

    pub fn is_stufe(connection: &redis::Connection, query: &String, creds: &String) -> Result<bool, &'static str>{
        let res_exists: RedisResult<bool> = connection.exists(KEY);

        if res_exists.is_err() {
            return Err("Could not fetch cache");
        }

        let key_exists = res_exists.unwrap();

        if key_exists {
            let res: RedisResult<bool> = connection.sismember(KEY, query);
            if res.is_err() {
                return Err("Could not fetch cache");
            }
            let value_exists = res.unwrap();
            return Ok(value_exists);
        }

        let stufen = get_stufen(connection, creds);
        if stufen.len() == 0 {
            return Err("Failed fetching stufen");
        }

        let res: RedisResult<bool> = connection.sismember(KEY, query);
        if res.is_err() {
            return Err("Could not fetch cache");
        }
        let value_exists = res.unwrap();
        return Ok(value_exists);
    }

}

pub mod stundenplan {
    use redis::RedisResult;
    use crate::redis::Commands;
    use std::error::Error;
    use std::ops::Deref;
    use std::vec::Vec;

    pub fn get_cache(connection: &redis::Connection, stufe: &String) -> Result<String, bool>{

        let key = format!("stundenplan_{}", stufe);
        let res: RedisResult<String> = connection.get(key);

        // if nil, String conversion fails:
        if res.is_err(){
            return Err(true);
        } else {
            return Ok(res.unwrap());
        }

    }

    fn fetch_over_network(stufe: &String,
                          stufe_id: &String,
                          woche1: &String,
                          woche2: &String,
                          creds: String) -> Result<String, Box<Error>> {
        let resp: String = reqwest::get(
            &format!("http://FETCH_BACKEND:8001/stundenplan/{}/{}/{}/{}/{}", woche1, woche2, stufe_id, stufe, creds)
            )?.text()?;

        return Ok(resp);
    }

    fn cache_value(connection: &redis::Connection, stufe: String, value: &String){
        let res: RedisResult<bool> = connection.set(format!("stundenplan_{}", stufe), value);
        println!("res: {:?}", res);
    }

    /// returns JSON or error message
    pub fn fetch(connection: &redis::Connection, stufe: String, stufe_id: String, creds: String) -> Result<String, String> {

        let wochen= get_wochen(connection, &creds);
        if wochen.is_err(){
            return Err(format!("Stundenplaene konnten nicht heruntergeladen werden"));
        }
        let wochen = wochen.unwrap();

        let sp = fetch_over_network(&stufe, &stufe_id, &wochen[0], &wochen[1], creds);
        if sp.is_err(){
            return Err(sp.unwrap_err().deref().description().to_string());
        }
        let sp = sp.unwrap();

        cache_value(connection, stufe, &sp);

        return Ok(sp);

    }

    fn get_wochen(connection: &redis::Connection, creds: &String) -> Result<Vec<String>, String> {

        let cache: RedisResult<String> = connection.get("wochen");
        if cache.is_ok(){
            let cs: String = cache.unwrap();
            let mut cs = cs.split(",");
            let cs1 = cs.next().unwrap().to_string();
            let cs2 = cs.next().unwrap().to_string();
            return Ok(vec![cs1, cs2]);
        }

        let res = crate::sessions::is_valid(connection, &format!("schueler"), creds);

        if res.is_err(){
            return Err(res.unwrap_err());
        }


        let cache: RedisResult<String> = connection.get("wochen");
        if cache.is_ok(){
            let cs: String = cache.unwrap();
            let mut cs = cs.split(",");
            let cs1 = cs.next().unwrap().to_string();
            let cs2 = cs.next().unwrap().to_string();
            return Ok(vec![cs1, cs2]);
        }

        return Err(format!("Error fetching cache")); // should never happen
    }

}