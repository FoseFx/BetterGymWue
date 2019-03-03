import * as express from "express";
import {RequestHandler} from "express";
import * as path from "path";
import * as fs from "fs";

const app = express();

export const PORT = process.env.PORT || 9090;
export const API_VERSION = "v3";

export function registerRoute(path: string, type: "get"|"post"|"options", ...handlers: RequestHandler[]): void {
    app[type](`/${API_VERSION}/${path}`, handlers);
}

/** This function imports all files in the folder provided */
function requireFolder(p: string): void{
    fs.readdirSync(path.join(__dirname, p)).forEach((f: string) => {
        if(/^.*\.js$/.test(f)){
            console.log("LOADING " + `${p}/${f}`);
            require(`./${p}/${f}`);
        }
        else if(/^((?!\.js).)*$/.test(f))
            requireFolder(p + "/" + f);
    });
}
requireFolder("routes");
requireFolder("middleware");





export default app;
