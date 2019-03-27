extern crate redis;
extern crate reqwest;



pub mod fetch_data {

    use std::env::vars;
    use redis::Commands;
    use std::error::Error;
    use std::collections::HashMap;


    pub fn fetch(key: String) -> Result<String, String>{

        let cache = get_cached_data(&key);

        if cache.is_ok() {
            return Ok(cache.unwrap());
        } else {
            let net_result = do_request(&key);

            if net_result.is_ok(){
                return Ok(net_result.unwrap());
            } else {
                println!("{:#?}", net_result.unwrap());
                return Err(format!("Err"));
            }
        }

    }


    fn get_cached_data(key: &String) -> redis::RedisResult<String> {

        let mut redis_full_path: Option<String> = Option::None;
        for (env_key, val) in vars(){
            if env_key == "REDIS_PATH" {
                redis_full_path = Some(val); // e.g. redis://0.0.0.0:6379/
            }
        }

        let slice : &str= &redis_full_path.unwrap()[..];

        println!("Redis Server: '{}'", slice);

        let client = redis::Client::open( slice)?;
        let con = client.get_connection()?;

        return con.get(&key[..]);

    }

    fn do_request(key: &String) -> Result<String, Box<Error>>{

        let resp: String = reqwest::get(&format!("https://jsonplaceholder.typicode.com/{}", key))?.text()?;
        return Ok(resp);

    }

    fn cache_value(&key: String, &value: String){

    }
}