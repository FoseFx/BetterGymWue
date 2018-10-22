"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
class portedDOMParser {
    constructor() { }
    parseFromString(html) {
        const dom = new JSDOM(html);
        return dom.window.document;
    }
}
exports.portedDOMParser = portedDOMParser;
