#!/usr/bin/env node

let glob = require("glob");
const fs = require("fs");
const path = require("path");
let exec = require('child_process').exec;


glob("dist/style*.css", {}, function (er, files) {
    if(er) throw new Error(er);
    if(!files[0]) return;
    let file = path.join(process.cwd(), files[0]);
    let content = fs.readFileSync(file, 'utf-8');
    const indexpath = path.join(process.cwd(), '/dist/index.html');
    let index = fs.readFileSync(indexpath, 'utf-8');
    index = index.replace('/*ABCDEFG*/', content);
    fs.writeFileSync(indexpath, index);
    exec('rm ' + files[0]);
});