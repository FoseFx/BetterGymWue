
const fetch = require("node-fetch");

const BASE_URL = "https://gymnasium-wuerselen.de/untis/";
/**
 *  @param {String} url - relative url
 *  @param {String} credentials - stuff behind the "Basic" in the Auth header
 */
function fetch_with_creds(url, credentials){
    return fetch(BASE_URL + url, {
        headers: {
            "Authorization": "Basic " + credentials,
            "User-Agent": "BGW Bot, mehr Infos auf bgw.fosefx.com/about"
        }
    });
}

module.exports = fetch_with_creds;