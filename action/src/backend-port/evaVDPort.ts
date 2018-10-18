import {VertretungsEva, VertretungsReihe} from "../../../source/src/app/Classes";
import {typeAbkuerzen, SACONDITION} from "../../../source/src/app/main/s/network/abkuerzen";
import {HTMLElement} from "./evaKurse-port";
const jsdom = require("jsdom");
const {JSODOM} = jsdom;


export function evaVDPort(html: string, lehrer = false): VertretungsEva {
    const dom = new JSODOM(html);
    const doc: HTMLElement = dom.window.document;

    let stufen = [];

    /*
        [0]: next File (e.g. "subst_001.html")
        [1]: Payload
    */
    let returnArray: VertretungsEva = [
        doc.querySelector('meta[http.equiv="refresh"]').content.split("URL=")[1],
        undefined
    ];

    doc.querySelectorAll("tr.list.odd,tr.list.even").forEach(function (zeile) {
        const children: HTMLElement[] = zeile.children;
        if(children.length === 0) return;

        const firstChild:HTMLElement = <HTMLElement>zeile.firstChild;

        // 'inline_header' is the classname of the td that indicates a new Stufe
        if(/( |^)inline_header( |$)/.test(firstChild.className)) {
            stufen.push({
                stufe: firstChild.textContent.split(' ')[0],
                cntnd: []
            });
            return;
        }

        let date = "";
        let oldroom = !lehrer? children[4].textContent.trim().replace(/\s/g, ""): '?';
        let klasse;
        let stundenstr = children[1].textContent.trim().replace(/\s/g, "");
        let stunden = stundenstr.split("-"); // [1, 2]
        let fach = children[lehrer?3:2].textContent.trim();
        let type = children[lehrer? 6:3].textContent.trim().replace(/\s/g, "").toLowerCase();
        let newroom = children[lehrer?4:5].textContent.trim().replace(/\s/g, "");
        let infotext = children[lehrer?7:6].textContent.trim().replace('\u00a0', '');

        SACONDITION.forEach(cond => {
            infotext = infotext.toUpperCase().replace(cond.toUpperCase(), 'SELBST. ARB.');
        });

        infotext = infotext.replace('AUFGABEN', 'AUFG.');
        type = typeAbkuerzen(type, infotext);

        if (!lehrer){
            date = children[0].textContent.trim().replace(/\s/g, "");
        }else{
            (<HTMLElement>(doc.getElementsByClassName('mon_title')[0])).textContent.trim().split('.').forEach((value, index, array) => {
                if(index === array.length -1) return;
                date += value.replace(" ", "") + ".";
            });
            klasse = children[2].textContent.trim().replace(/\s/g, "");
        }
        let pushObj:VertretungsReihe = {
            type: type,
            date: date,
            fach: fach,
            oldRaum: oldroom,
            newRaum: newroom,
            info: infotext,
        };
        if(lehrer){
            pushObj.stufe = klasse;
        }
        stunden.forEach((stunde, i, array) => {
            let obj = Object.assign({}, pushObj);
            obj.stunde = stunde;
            stufen[stufen.length - 1].cntnd.push(obj);

            if (i === (array.length - 1)) {
                let alls = "";
                array.forEach((ts, ind) => {
                    alls += ts + (ind<array.length-1?" - ":"");
                });
                obj = Object.assign({}, pushObj);
                obj.stunde = alls;
                obj.nd = 1;
                stufen[stufen.length - 1].cntnd.push(obj);
            }
        });

    });

    let infoBox = [];
    Array.from(doc.querySelectorAll('tr.info')).forEach(function (inforow, i) {
        Array.from(inforow.children).forEach((child:HTMLElement)=>{
            if(child.tagName.toLowerCase() === "th" ||
                child.parentElement.childElementCount !== 1 &&
                i === 1){
                infoBox.push('<b>' + child.textContent.trim() + '</b>')
            }else{
                infoBox.push(child.textContent.trim());
            }
        })
    });
    returnArray[1] = [stufen, infoBox];
    return returnArray;

}