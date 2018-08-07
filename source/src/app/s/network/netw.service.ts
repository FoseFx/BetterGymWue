import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CONFIG} from '../../conf';
import {BaseService} from '../base.service';
import {AlertService} from '../alert.service';
import * as Cloud from './cloud.netw'
import * as Initial from './initial.netw'
import * as $ from 'jquery';

@Injectable()
export class NetwService {

  public _kurse = [{kurse: []}, {kurse: []}];
  private _stufen;
  public wochen = [];
  saveKurseTrys = 0;
  public tempTTs: { stufe: string, tt: {}[] }[] = [];

  constructor(public baseService: BaseService, private alertService: AlertService, private httpClient: HttpClient) {
    this._stufen = (localStorage.stufen) ? JSON.parse(localStorage.stufen) : undefined;
  }

  private start = 'subst_001.htm';

  getVertretungsDaten(tag: string, i: number, urlmiddle?: string, file?: string[], sides? : any[]) {
    urlmiddle = urlmiddle || 'f1';
    file = file || ['subst_001.htm', 'subst_001.htm'];
    sides = sides || [];
    if(!this.baseService.credentials.l || !this.baseService.preLehrer) return new Promise((resolve, reject) => {
      this.baseService.makeConnections(CONFIG.vertURL + urlmiddle + '/' + file[i]).subscribe(
        (wert) => {
          if($(wert).find(".mon_title").html().match(tag) === null){
            reject(urlmiddle);
          }
          let eva = this.evaVD(wert);
          file[i] = eva[0];
          sides.push(eva[1]);
          resolve([tag, i, urlmiddle, file, sides]);
        },
        (err) => {
          this.alertService.alert('Failure: ' + err.statusText, this.alertService.DANGER);
          reject('fail');
        },
      );
    })
      .then((t) => {
        let tag = t[0];
        let i = t[1];
        let urlmiddle = t[2];
        let file = t[3];
        let sides = t[4];
        if (file[i] == this.start) {
          return this.compileVD(sides);
        } else return this.getVertretungsDaten(tag, i, urlmiddle, file, sides);
      })
      .catch((err) => {
        if(err != 'fail'){
          if(err != 'f2') return this.getVertretungsDaten(tag, i, 'f2');
          else return new Promise((resolve, reject) => {reject('loop')});
        }else{
          return new Promise((resolve, reject) => {reject()});
        }
      });
    else
      return new Promise((resolve, reject) => {
        this.baseService.makeConnections(CONFIG.lehrerURL + urlmiddle + '/' + file[i], true).subscribe(
          (wert) => {
            if($(wert).find(".mon_title").html().match(tag) === null) reject(urlmiddle);
            let eva = this.evaVD(wert, true);
            file[i] = eva[0];
            sides.push(eva[1]);
            resolve([tag, i, urlmiddle, file, sides]);
          },
          (err) => {
            this.alertService.alert('Failure: ' + err.statusText, this.alertService.DANGER);
            reject('fail');
          }
        );
      })
        .then((t) => {
          let tag = t[0];
          let i = t[1];
          let urlmiddle = t[2];
          let file = t[3];
          let sides = t[4];
          if(file[i] == this.start){
            return this.compileVD(sides, true);
          }else{
            return this.getVertretungsDaten(tag, i, urlmiddle, file, sides);
          }
        })
        .catch((err) => {
          if(err != 'fail'){
            console.log("rej " + err);
            if(err != 'f2') return this.getVertretungsDaten(tag, i, 'f2');
            else return new Promise((resolve, reject) => {reject('loop')});
          }else{
            this.baseService.milchglas = false;
            return new Promise((resolve, reject) => {reject()});
          }
        });
  }

  getSchulplanerInfo(date: string){
    date = date.replace(/\./g, "-");
    return new Promise((resolve, reject) => {
      this.baseService.makeConnections(CONFIG.databaseURL + "info/" + date + "/" + this.baseService.myStufe + ".json").subscribe((val) => {
        let val2 = (val != "null") ? JSON.parse(val) : [];
        this.baseService.makeConnections(CONFIG.databaseURL + "info/" + date + "/*.json").subscribe((valueAll) => {
          let valueAll2 = (valueAll == "null")? [] : JSON.parse(valueAll);
          resolve(val2.concat(valueAll2));
        });
      },
      (err) => {
        reject(err);
      });
    });
  }

  private evaVD(ret, lehrer?:boolean){
    lehrer = lehrer || false;
    let returnArray = [];
    // returns url to next element
    returnArray[0] = ret.split("<meta http-equiv=\"refresh\" content=\"10; URL=")[1].split("\">")[0];
    let arr = [];
    $(ret).find("table.mon_list").children("tbody").children("tr.list").each(function (index, v) {
      if (index === 0) return;
      v = $(v);
      if (v.children().length == 1) arr.push({stufe: $(v.children()[0]).html().split(" ")[0], cntnd: []});
      else{
        let s = [];
        $(v.children()[1]).html().split("-").forEach((idk) => {s.push(idk.replace(" ", ""))});
        s.forEach((ss, iii, array) => {
          if(!lehrer){
            let infoo = $(v.children()[6]).html();
            let t = $(v.children()[3]).html().replace(" ", "").replace("<b>", "").replace("</b>", "");

            if (t.toLowerCase() == "entfall") t = "e";
            else if (t.toUpperCase() === "STATT-VERTRETUNG") t = "statt-v";
            else if (t.toLowerCase() == "vertretung") {
              t = "v";
              if (infoo.toLowerCase().match("selbstständiges arbeiten") ||
                infoo.toLowerCase().match("selbständiges arbeiten") ||
                infoo.toLowerCase().match("selbstständies arbeiten") ||
                infoo.toLowerCase().match("selbstäniges arbeiten")
              ) t = "e (v)";
            }else if (t.toLowerCase() == "raum-vtr.") t = "r";
            else if (t.toLowerCase() == "klausur") t = "k";
            infoo = infoo.toLowerCase().replace("selbstständiges arbeiten", "Selbst. Arb.");
            infoo = infoo.toLowerCase().replace("selbständiges arbeiten", "Selbst. Arb.");
            infoo = infoo.toLowerCase().replace("selbstäniges arbeiten", "Selbst. Arb.");
            infoo = infoo.toLowerCase().replace("selbstständies arbeiten", "Selbst. Arb.");
            infoo = infoo.toUpperCase().replace("&NBSP;", " ");

            arr[arr.length - 1].cntnd.push({
              type: t,
              date: $(v.children()[0]).html().replace(" ", ""),
              fach: $(v.children()[2]).html().replace(" ", ""),
              oldRaum: $(v.children()[4]).html().replace(" ", ""),
              newRaum: $(v.children()[5]).html().replace(" ", ""),
              info: infoo,
              stunde: ss,
            });
            if (iii === (array.length -1)){
              let alls = "";
              array.forEach((ts) => {alls += ts + " - "});
              alls = alls.substr(0, alls.length - 3);
              arr[arr.length - 1].cntnd.push({
                type: t,
                date: $(v.children()[0]).html().replace(" ", ""),
                fach: $(v.children()[2]).html().replace(" ", ""),
                oldRaum: $(v.children()[4]).html().replace(" ", ""),
                newRaum: $(v.children()[5]).html().replace(" ", ""),
                info: infoo,
                stunde: alls,
                nd: 1
              });
            }
          }
          else{
            let infoo = $(v.children()[7]).html();
            let t = $(v.children()[6]).html().replace(" ", "").replace("<b>", "").replace("</b>", "");
            if(t.toLowerCase().indexOf("entfall") != -1) t = "e";
            else if(t.toLowerCase().indexOf("absenz") != -1) t = "fehlt";
            else if(t.toLowerCase().indexOf("vertretung") != -1){
              t = "v";
              if (infoo.toLowerCase().match("selbstständiges arbeiten") ||
                infoo.toLowerCase().match("selbständiges arbeiten") ||
                infoo.toLowerCase().match("selbständiges arbeiten") ||
                infoo.toLowerCase().match("selbstständies arbeiten")
              ) t = "e (v)";
            }

            else if (t.toLowerCase() == "raum-vtr.") t = "r";
            else if (t.toLowerCase() == "klausur") t = "k";

            infoo = infoo.toLowerCase().replace("selbstständiges arbeiten", "Selbst. Arb.");
            infoo = infoo.toLowerCase().replace("selbständiges arbeiten", "Selbst. Arb.");
            infoo = infoo.toLowerCase().replace("selbstäniges arbeiten", "Selbst. Arb.");
            infoo = infoo.toLowerCase().replace("selbstständies arbeiten", "Selbst. Arb.");
            infoo = infoo.toUpperCase().replace("&NBSP;", " ");
            infoo = infoo.toUpperCase().replace("AUFGABEN", "AUFG.");

            let d = "";
            $(ret).find(".mon_title").html().split(".").forEach((value, index, array) => {
              if(index == array.length -1) return;
              d += value.replace(" ", "") + ".";
            });

            arr[arr.length - 1].cntnd.push({
              type: t,
              date: d,
              fach: $(v.children()[3]).html().replace(" ", ""),
              oldRaum: '?',
              newRaum: $(v.children()[4]).html().replace(" ", ""),
              info: infoo,
              stunde: ss,
              stufe: $(v.children()[2]).html().replace(" ", "")
            });
            if (iii === (array.length -1)){
              let alls = "";
              array.forEach((ts) => {alls += ts + " - "});
              alls = alls.substr(0, alls.length - 3);
              arr[arr.length - 1].cntnd.push({
                type: t,
                date: d,
                fach: $(v.children()[3]).html().replace(" ", ""),
                oldRaum: '?',
                newRaum: $(v.children()[4]).html().replace(" ", ""),
                info: infoo,
                stunde: alls,
                nd: 1,
                stufe: $(v.children()[2]).html().replace(" ", "")
              });
            }
          }

        });
      }
    });
    let info = [];
    $(ret).find("table.info").children("tbody").children("tr").each(function (index, v) {
      $(v).children().each((i, data) => {
        if($(data).prop("tagName").toLowerCase() == "th" || ($(data).parent().children().length != 1 && i == 0)){
          info.push('<b>' + $(data).text() + '</b>');
        }else {
          info.push($(data).text());
        }
      });
    });
    returnArray[1] = [arr, info];
    return returnArray;
  }

  private compileVD(slides, lehrer?:boolean){
    lehrer = lehrer || false;
    let compr = {};
    let info = [];
    slides.forEach((a) => {
      a[0].forEach((t) => {
        let arr = [];
        t.cntnd.forEach((r) => {
          if(!lehrer) arr.push({
            stufe: decodeHtml(t.stufe),
            date: decodeHtml(r.date),
            fach: decodeHtml(r.fach),
            oldRaum: decodeHtml(r.oldRaum),
            newRaum: decodeHtml(r.newRaum),
            info: decodeHtml(r.info),
            stunde: decodeHtml(r.stunde),
            type: decodeHtml(r.type),
            nd: r.nd,
            });
          else arr.push({
            lehrer: decodeHtml(t.stufe),
            stufe: decodeHtml(r.stufe),
            date: decodeHtml(r.date),
            fach: decodeHtml(r.fach),
            oldRaum: decodeHtml(r.oldRaum),
            newRaum: decodeHtml(r.newRaum),
            info: decodeHtml(r.info),
            stunde: decodeHtml(r.stunde),
            type: decodeHtml(r.type),
            nd: r.nd,
          });
        });
        arr.forEach((arrE) => {
          if (compr[arrE.stufe]) compr[arrE.stufe].push(arrE); else compr[arrE.stufe] = [arrE];
        });
      });
      if (a[1][0]) info.push(a[1]);
    });
    // sort
    for (let stufe in compr){
      compr[stufe].sort(function (a, b) {
        if (a.stunde > b.stufe) return 1;
        if (a.stufe < b.stufe) return -1;
        else return 0;
      });
    }

    return [info, compr];
  }

  getkurse(stufe: string, stufeid: number){
    return Initial.getkurse(stufe, stufeid, this)
  }

  get stufen(){
    return Initial.get_stufen(this._stufen, this.baseService, this.alertService, this.wochen)
  }

  fetchCloud(id: number){
    return Cloud.fetchCloud(id, this);
  }

  saveKurse(kurse){
    return Cloud.saveKurse(kurse, this);
  }

  public evaKurse(r, ABWOCHE, stufe){
    let arr = [];
    let orig = $(r.replace(/\r?\n|\r/g, '').toUpperCase());
    ABWOCHE = orig.find("font");
    ABWOCHE = ABWOCHE[ABWOCHE.length - 1].innerText.split("- ")[1].split(" (")[0].split(" ")[1].toLowerCase();
    console.log(ABWOCHE);
    let what = (ABWOCHE === "a")? 0:1;
    let main = orig.children('table')[0];
    $(main).children('tbody').children('tr')[0].remove();
    main = $(main).children('tbody')[0];
    $(main).find('b').each(function () {
      if ($(this).html() === 'PAUSE') {
        $(this).parents().eq(6).attr('id', 'pause').html(' ');
      }
    });
    let subtractor = 0;
    $(main).children('tr').each((someindex, welcheRow) => {
      let row = $(welcheRow);
      if (row.is('#pause')) return;
      let stunde = [];
      if (row.html() === '') {
        subtractor++;
        row.remove();
        return;
      }
      row.children('td').each((i, idfk) => {
        let TAG = i;
        if (i === 0) return;
        let isBig = false;
        if ($(idfk).attr('rowspan') === '4') isBig = true;

        let data = $(idfk).children('table').children('tbody');
        let rowz = data.children('tr');

        if (rowz.length  === 1) {
          let vars = rowz.find('font');
          if (vars.length === 1) {
            if (vars.html() !== '') return;
          }
          let fach = $(vars[0]).children('b').html();
          let lehrer = $(vars[1]).html();
          let raum = $(vars[2]).html();
          let objz = {
            type: 'klasse',
            isBig: isBig,
            fach: fach,
            lehrer: lehrer,
            raum: raum,
            pos: [welcheRow - subtractor + 1, TAG - 1]
          };
          stunde.push(objz);
        } else {
          let fach = rowz.find('font').children('b').html();
          let raeume = [];
          rowz.each((i, jndjnsjfs) => {
            if (i === 0) return;
            let ffach = $($(jndjnsjfs).children('td')[0]).children('font').html();
            let lehrer = $($(jndjnsjfs).children('td')[1]).children('font').html();
            let raum = $($(jndjnsjfs).children('td')[2]).children('font').html();

            raeume.push({kurs: ffach, raum: raum});

            let kurs = {
              title: fach,
              fach: ffach,
              lehrer: lehrer
            };
            let orig = null;


            for(let i = 0; i < this._kurse[what].kurse.length; i++)
              if(kurs.fach === this._kurse[what].kurse[i].fach) orig = i;
            if(orig === null){
              this._kurse[what].kurse.push({
                fach: kurs.fach,
                lehrer: kurs.lehrer,
                title: kurs.title
              });
            }
          });
          let objz = {
            type: 'kurs',
            fach: fach,
            isBig: isBig,
            raeume: raeume
          };
          stunde.push(objz);
        }
      });
      arr.push(stunde);
    });

    let final = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].length !== 0) {
        let tval = true;
        if (tval) final.push(arr[i]);
      }
    }

    let tt = { days: [[], [], [], [], []]};
    final.forEach(function (stunden, eins) {

      stunden.forEach(function (tage, zwei) {
        let back = {};
        let tag = zwei;
        let stunde = eins;
        let ob = tt.days[tag][stunde];

        while (typeof ob != 'undefined') {
          stunde++;
          ob = tt.days[tag][stunde];
        }
        if (tage.fach !== undefined || tage.fach === 'klasse') {
          if (tage.type === 'klasse') {
            back = {
              type: tage.type,
              fach: tage.fach,
              lehrer: tage.lehrer,
              raum: tage.raum
            };
          } else if (tage.type === 'kurs') {
            back = {
              type: tage.type,
              fach: tage.fach,
              raeume: tage.raeume
            };
          }
        }
        tt.days[tag][stunde] = back;
        if (tage.isBig) tt.days[tag][stunde + 1] = back;
      });
    });
    for(let i = 0; i < 5; i++){
      tt.days[i].splice(6, 0, {});
    }
    let b = true;
    this.tempTTs.forEach((val, i) => {
      if (val.stufe === stufe) {
        val.tt[what] = (tt);
        b = false;
      }
    });
    if (b)
      this.tempTTs.push({
        stufe: stufe,
        tt: (what === 0) ? [tt] : [, tt]
      });
  }

  getTT(stufe){
    return Initial.getTT(stufe, this.tempTTs);
  }
}


function decodeHtml(html) {
  let txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}