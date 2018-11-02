import {
    VertretungsDaten,
    VertretungsEva,
    VertretungsEvaPayload,
    VertretungsReihe
} from "../../../source/src/app/Classes";
import {Creds} from "../Classes";
import {VERT_URL_L, VERT_URL_S} from "../CONFIG";
import {fetchWithCreds} from "../util";
import {HTMLElement} from "./evaKurse-port";
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


export function _getLehrerVertretungsDaten(creds: Creds, expectedDate): Promise<VertretungsDaten> {
    return fetchVD(creds, expectedDate, true);
}

export function _getSchuelerVertretungsDaten(creds: Creds, expectedDate): Promise<VertretungsDaten> {
    return fetchVD(creds, expectedDate);
}

export async function fetchVD(creds: Creds, expectedDate: string, lehrer = false): Promise<VertretungsDaten | null>{
    let frames: VertretungsEvaPayload[][] = await Promise.all([
        fetchVDFrame(creds, "f1/", expectedDate, lehrer),
        fetchVDFrame(creds, "f2/", expectedDate, lehrer)
    ]);
    return analyzeVD(frames);
}

const START_FILE = "subst_001.htm";

/**
 * @returns VertretungsDaten: This frames Date
 * @returns Null            : This frame is old
 * */
export async function fetchVDFrame(creds: Creds,
                                   frame: "f1/"|"f2/",
                                   expectedDate: string,
                                   lehrer: boolean,
                                   file = START_FILE,
                                   slides: VertretungsEvaPayload[] = []
): Promise<VertretungsEvaPayload[]> {
    const resp = await fetchWithCreds(lehrer? VERT_URL_L:VERT_URL_S + frame + file, creds, true);
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
    return fetchVDFrame(creds, frame, expectedDate, lehrer, file, slides);

}

export function analyzeVD(frames: VertretungsEvaPayload[][]): VertretungsDaten {
    if(frames.length !== 2) throw new Error("expected:  analyzeVD([frame1, frame2]), but got length of " + frames.length);
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