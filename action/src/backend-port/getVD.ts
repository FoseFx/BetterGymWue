import {
    VertretungsDaten,
    VertretungsEva,
    VertretungsEvaPayload,
    VertretungsReihe
} from "../../../source/src/app/Classes";
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
    const result = await fetchVD(creds, expectedDate);
    console.log(JSON.stringify(result));
    return result;
    //throw new Error("Not implemented function _getVertretungsDaten");

}

export async function fetchVD(creds: Creds, expectedDate: string): Promise<VertretungsDaten | null>{
    let frames = await Promise.all([
        fetchVDFrame(creds, "f1/", expectedDate),
        fetchVDFrame(creds, "f2/",expectedDate)
    ]);
    return analyzeVD(frames);
}

const START_FILE = "subst_001.htm";
/**
 * @returns VertretungsDaten: This frames Date
 * @returns Null            : This frame is old
 * */
export async function fetchVDFrame(creds: Creds,
                                   frame: string,
                                   expectedDate: string,
                                   file = START_FILE,
                                   slides: VertretungsEvaPayload[] = []
): Promise<VertretungsEvaPayload[] | null> {
    const resp = await fetchWithCreds(VERT_URL_S + frame + file, creds, true);
    const text = await resp.textConverted();
    const dom = new JSDOM(text);
    const doc: HTMLElement = dom.window.document;
    // test whether this frame is old
    const tagOnDoc = doc.querySelector(".mon_title").textContent.trim();
    if (tagOnDoc.match(expectedDate) === null)
        return null;
    const eva: VertretungsEva = evaVDPort(text, false);
    file = eva[0];
    slides.push(eva[1]);
    if(file === START_FILE) return slides;
    return fetchVDFrame(creds, frame, expectedDate, file, slides);

}

export function analyzeVD(frames: VertretungsEvaPayload[][]): VertretungsDaten {
    // remove the one empty frame
    const frame = (frames[0] !== null) ? frames[0]: frames[1];
    if(frame === null) return null; // None of them have content
    let info: string[] = [];
    let stufenObj: {[key: string]: VertretungsReihe[]} = {};

    frame.forEach(function (slide: VertretungsEvaPayload) {
        const infoArray: string[] = slide[1];
        info = info.concat(infoArray);

        slide[0].forEach(function (stufeCntent) {
            const stufe:string = stufeCntent.stufe;
            const content: VertretungsReihe[] = stufeCntent.cntnd;

            if(!stufenObj[stufe])
                stufenObj[stufe] = content;
            else
                stufenObj[stufe] = stufenObj[stufe].concat(content);
        });
    });

    return [info, stufenObj];

}