const fetch_with_creds = require("../../fetch");
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
        requesturl = "Schueler-Stundenplan/frames/navbar.htm";
    } else if (mode === "lehrer"){
        requesturl = "Lehrer-Stundenplan/frames/navbar.htm";
    }

    console.log("requesting", requesturl, mode, credentials);


    let resp = await fetch_with_creds(requesturl, credentials);

    const ok = resp.ok;
    if (!ok){
        res.statusCode = 401;
        res.end();
    } else {
        res.end("verified");
    }


}

module.exports = auth;