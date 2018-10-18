import {VertretungsDaten, VertretungsEva, VertretungsEvaPayload} from "../../../source/src/app/Classes";
import {Creds} from "../Classes";
import {VERT_URL_S} from "../CONFIG";
import {fetchWithCreds} from "../util";
import {HTMLElement} from "./evaKurse-port";
import {portedDOMParser} from "./customDOMParser";
import {evaVDPort} from "./evaVDPort";
const jsdom = require("jsdom");
const {JSDOM} = jsdom;

export function getVertretungsdaten(creds: Creds, useLehrer = false, date = new Date()): Promise<VertretungsDaten> {
    const expectedDate = date.getDate() + "." + (date.getMonth() + 1) + ".";

    const cache = null; // TODO cache
    if(cache) return cache;
    if(useLehrer) return _getLehrerVertretungsDaten(creds.l, expectedDate);
    else return _getSchuelerVertretungsDaten(creds, expectedDate);
}


export async function _getLehrerVertretungsDaten(creds: Creds, expectedDate): Promise<VertretungsDaten> {
    throw new Error("Not implemented function _getVertretungsDaten");
}

export async function _getSchuelerVertretungsDaten(creds: Creds, expectedDate): Promise<VertretungsDaten> {
    const result = fetchVD(creds, VERT_URL_S, expectedDate);
    throw new Error("Not implemented function _getVertretungsDaten");

}

export async function fetchVD(creds: Creds, url: string, expectedDate: string): Promise<VertretungsDaten | null>{
    let frames = [
        fetchVDFrame(creds, url, "f1/", expectedDate),
        fetchVDFrame(creds, url, "f2/",expectedDate)
    ];
    console.log(JSON.stringify(frames));
    return null;
    // TODO
}

const START_FILE = "subst_001.htm";
/**
 * @returns VertretungsDaten: This frames Date
 * @returns Null            : This frame is old
 * */
export async function fetchVDFrame(creds: Creds,
                                   url: string,
                                   frame: string,
                                   expectedDate: string,
                                   file = START_FILE,
                                   slides: VertretungsEvaPayload[] = []
): Promise<VertretungsEvaPayload[] | null> {

    const resp = await fetchWithCreds(url, creds, true);
    const text = await resp.textConverted();
    const dom = new JSDOM(text);
    const doc: HTMLElement = dom.window.document;
    // test whether this frame is old
    const tagOnDoc = doc.getElementsByClassName("mon_title")[0].textContent.trim();
    if (tagOnDoc.match(expectedDate) === null)
        return null;
    const eva: VertretungsEva = evaVDPort(text, false); // TODO evaVD
    file = eva[0];
    slides.push(eva[1]);
    if(file === START_FILE) return slides;
    return fetchVDFrame(creds, url, frame, expectedDate, file, slides);

}