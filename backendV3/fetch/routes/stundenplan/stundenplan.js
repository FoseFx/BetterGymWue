const fetch_with_creds = require("../../fetch");
const generateTT = require("./getTT");

// GET /stundenplan/{Woche 1}/{Woche 2}/{NUMBER_OF_STUFE_WITH_0s}/{STUFE AS STRING}/{SCHUELER_CREDS}
async function stundenplan(req, res){
    const url = req.url;

    const regex_res = url.match(/^\/stundenplan\/(\d{2})\/(\d{2})\/(\d{5})\/(.+)\/(.+)$/);
    
    if (regex_res === null){
        res.statusCode = 400;
        return res.end("Invalid request " + url);
    }

    const wochea = regex_res[1];
    const wocheb = regex_res[2];
    const stufe = regex_res[3];
    const stufe_full = regex_res[4];
    const credentials = regex_res[5];

    const requesturl1 = `Schueler-Stundenplan/${wochea}/c/c${stufe}.htm`;
    const requesturl2 = `Schueler-Stundenplan/${wocheb}/c/c${stufe}.htm`;

    console.log(requesturl1,requesturl2, credentials);
    
    let resp1 = await fetch_with_creds(requesturl1, credentials)

    let resp2 = await fetch_with_creds(requesturl2, credentials);


    let ok = resp1.ok && resp2.ok;
    if (!ok){
        res.statusCode = 401;
        res.end();
    }

    let text1 = await resp1.textConverted();
    let text2 = await resp2.textConverted();

    let tt = JSON.stringify(generateTT(stufe_full, text1, text2));  

    res.end(tt);
}


module.exports = stundenplan;