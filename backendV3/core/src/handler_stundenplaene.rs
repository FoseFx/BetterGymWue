use crate::cache::redis::RedisConnection;
use std::ops::Deref;

#[get("/stundenplan/<stufe>")]
pub fn get_stundenplan(connection: RedisConnection, stufe: String) -> String {
    let connection = connection.0.deref();
    

    return stufe;
}