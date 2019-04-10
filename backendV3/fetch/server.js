const auth = require("./routes/auth/auth");
const stundenplan = require("./routes/stundenplan/stundenplan");

const http = require("http");

http.createServer(async (req, res) => {
    if (/^\/auth\//.test(req.url)){
        auth(req, res);
    } else if (/^\/stundenplan\//.test(req.url)){
        stundenplan(req, res);
    }
    else res.end("Ok");

}).listen(8001, () => {
    console.log("Fetch Backend Server started");
});