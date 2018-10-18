import {HTMLElement} from "./evaKurse-port";

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
export class portedDOMParser{

    constructor(){}
    parseFromString(html: string): HTMLElement{
        const dom = new JSDOM(html);
        return dom.window.document;
    }

}