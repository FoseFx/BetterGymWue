#!/usr/bin/env node

const glob = require("glop");
const path = require("path");
const fs = require("fs");
console.log(path.join(process.cwd(), process.argv[2]));
glob(path.join(process.cwd(), process.argv[2]), function (err, file) {
    if (err) throw new Error(err);
    console.log(file);
    fs.writeFileSync(path.join(process.cwd(), "./w.file"), file[0]);
});