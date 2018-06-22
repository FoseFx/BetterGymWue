#!/usr/bin/env node
if(process.argv.length === 2) {
    throw new Error("No Arguments given");
}

const fs = require("fs");
const path = require("path");

let replaceFile = null;

process.argv.forEach((v, i) => {
    if(v.indexOf("-rf") !== -1) replaceFile = v.split("-rf=")[1];
});

let orig = process.argv[2];
let sel = process.argv[3];
let repl = (replaceFile != null)? path.join(process.cwd(), replaceFile) : process.argv[4];
let file = path.join(process.cwd(), orig);

let cntndOrig = fs.readFileSync(file, "utf-8");
if(replaceFile !== null){
    repl = fs.readFileSync(repl);
}
let c = cntndOrig.replace(sel, repl);
fs.writeFileSync(file, c);