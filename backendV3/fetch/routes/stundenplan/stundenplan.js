const fetch_with_creds = require("../../fetch");

// GET /stundenplan/{A-Woche}/{B-Woche}/{NUMBER_OF_STUFE_WITH_0s}/{SCHUELER_CREDS}
async function stundenplan(req, res){
    const url = req.url;

    const regex_res = url.match(/^\/stundenplan\/(\d{2})\/(\d{2})\/(\d{5})\/(.+)$/);
    
    if (regex_res === null){
        return res.end("Invalid request " + url);
    }

    const wochea = regex_res[1];
    const wocheb = regex_res[2];
    const stufe = regex_res[3];
    const credentials = regex_res[4];

    const requesturlA = `Schueler-Stundenplan/${wochea}/c/c${stufe}.htm`;
    const requesturlB = `Schueler-Stundenplan/${wocheb}/c/c${stufe}.htm`;

    console.log(requesturlA,requesturlB, credentials);
    
    let resp = await fetch_with_creds(requesturlA, credentials)

    let respB = await fetch_with_creds(requesturlB, credentials);

    let textA = await resp.textConverted();
    let textB = await respB.textConverted();

    // todo actual conversion
    

    const ok = resp.ok;
    if (!ok){
        res.statusCode = 401;
        res.end();
    } else {
        res.end("NIY");
    }

    res.end("stundenplan");
}


module.exports = stundenplan;