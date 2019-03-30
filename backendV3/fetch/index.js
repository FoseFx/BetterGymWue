const http = require("http");
const fetch = require("node-fetch");

// THIS SERVER ASUMES A SECURE REQUEST

const BASE_URL = "https://gymnasium-wuerselen.de/untis/";

http.createServer(async (req, res) => {
    if (/^\/auth\//.test(req.url)){
        auth(req, res);
    }
    else res.end("Ok");

}).listen(8001, () => {
    console.log("Fetch Backend Server started");
});

//
// Authentication
//

// GET /auth/{lehrer|schueler}/{credentials}
async function auth(req, res) {
    
    const url = req.url;
    const regex_res = url.match(/^\/auth\/(lehrer|schueler)\/(.+)$/);
    
    if (regex_res === null){
        return res.end("Invalid request " + url);
    }

    const mode = regex_res[1];
    const credentials = regex_res[2];

    let requesturl = "";
    if (mode === "schueler"){
        requesturl = BASE_URL + "Schueler-Stundenplan/frames/navbar.htm";
    } else if (mode === "lehrer"){
        requesturl = BASE_URL + "Lehrer-Stundenplan/frames/navbar.htm";
    }

    console.log("requesting", requesturl, mode, credentials);


    let resp = await fetch(requesturl, {
        headers: {
            "Authorization": "Basic " + credentials,
            "User-Agent": "BGW Bot, mehr Infos auf bgw.fosefx.com/about"
        }
    });

    const ok = resp.ok;
    if (!ok){
        res.statusCode = 401;
        res.end();
    } else {
        res.end("verified");
    }


}


