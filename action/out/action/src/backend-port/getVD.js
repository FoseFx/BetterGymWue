"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const CONFIG_1 = require("../CONFIG");
const util_1 = require("../util");
const evaVDPort_1 = require("./evaVDPort");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
function getVertretungsdaten(creds, useLehrer = false, date = new Date()) {
    const expectedDate = date.getDate() + "." + (date.getMonth() + 1) + ".";
    const cache = null; // TODO cache
    if (cache)
        return cache;
    if (useLehrer)
        return _getLehrerVertretungsDaten(creds.l, expectedDate);
    else
        return _getSchuelerVertretungsDaten(creds, expectedDate);
}
exports.getVertretungsdaten = getVertretungsdaten;
function _getLehrerVertretungsDaten(creds, expectedDate) {
    return fetchVD(creds, expectedDate, true);
}
exports._getLehrerVertretungsDaten = _getLehrerVertretungsDaten;
function _getSchuelerVertretungsDaten(creds, expectedDate) {
    return fetchVD(creds, expectedDate);
}
exports._getSchuelerVertretungsDaten = _getSchuelerVertretungsDaten;
function fetchVD(creds, expectedDate, lehrer = false) {
    return __awaiter(this, void 0, void 0, function* () {
        let frames = yield Promise.all([
            fetchVDFrame(creds, "f1/", expectedDate, lehrer),
            fetchVDFrame(creds, "f2/", expectedDate, lehrer)
        ]);
        return analyzeVD(frames);
    });
}
exports.fetchVD = fetchVD;
const START_FILE = "subst_001.htm";
/**
 * @returns VertretungsDaten: This frames Date
 * @returns Null            : This frame is old
 * */
function fetchVDFrame(creds, frame, expectedDate, lehrer, file = START_FILE, slides = []) {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield util_1.fetchWithCreds(lehrer ? CONFIG_1.VERT_URL_L : CONFIG_1.VERT_URL_S + frame + file, creds, true);
        const text = yield resp.textConverted();
        const dom = new JSDOM(text);
        const doc = dom.window.document;
        // test whether this frame is old
        const tagOnDoc = doc.querySelector(".mon_title").textContent.trim();
        if (tagOnDoc.match(expectedDate) === null)
            return null;
        const eva = evaVDPort_1.evaVDPort(text, false);
        file = eva[0];
        slides.push(eva[1]);
        if (file === START_FILE)
            return slides;
        return fetchVDFrame(creds, frame, expectedDate, lehrer, file, slides);
    });
}
exports.fetchVDFrame = fetchVDFrame;
function analyzeVD(frames) {
    if (frames.length !== 2)
        throw new Error("expected:  analyzeVD([frame1, frame2]), but got length of " + frames.length);
    // remove the one empty frame
    const frame = (frames[0] !== null) ? frames[0] : frames[1];
    if (frame === null)
        return null; // None of them have content
    let info = [];
    let stufenObj = {};
    frame.forEach(function (slide) {
        const infoArray = slide[1];
        info = info.concat(infoArray);
        slide[0].forEach(function (stufeCntent) {
            const stufe = stufeCntent.stufe;
            const content = stufeCntent.cntnd;
            if (!stufenObj[stufe])
                stufenObj[stufe] = content;
            else
                stufenObj[stufe] = stufenObj[stufe].concat(content);
        });
    });
    return [info, stufenObj];
}
exports.analyzeVD = analyzeVD;
