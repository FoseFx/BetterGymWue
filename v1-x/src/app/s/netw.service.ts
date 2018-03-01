import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CONFIG} from '../conf';
import {BaseService} from './base.service';
import {AlertService} from './alert.service';
import {reject} from 'q';
import * as $ from 'jquery';
import {baseBuildCommandOptions} from '@angular/cli/commands/build';
import {escape} from 'querystring';

@Injectable()
export class NetwService {

  private _kurse = [{kurse: []}, {kurse: []}];
  private _stufen;
  public wochen = [];
  saveKurseTrys = 0;
  private tempTTs: { stufe: string, tt: {}[] }[] = [];

  constructor(private baseService: BaseService, private alertService: AlertService, private httpClient: HttpClient) {
    this._stufen = (localStorage.stufen) ? JSON.parse(localStorage.stufen) : undefined;
  }

  private start = 'subst_001.htm';
  private file = ['subst_001.htm', 'subst_001.htm'];
  private sides = [];
  VD;

  getVertretungsDaten(tag: string, i: number) {

    return new Promise((resolve, reject) => {
      this.baseService.makeConnections(CONFIG.vertURL + tag + '/' + this.file[i]).subscribe(
        (wert) => {
          let eva = this.evaVD(wert);
          this.file[i] = eva[0];
          this.sides.push(eva[1]);
          resolve();
        },
        (err) => {
          this.alertService.alert('Failure: ' + err.statusText, this.alertService.DANGER);
        }
      );
    }).then(() => {
      if (this.file[i] == this.start) {
        // todo compile and resolve
        this.VD =  this.compileVD(this.sides);
        return this.VD;
      } else return this.getVertretungsDaten(tag, i);
    });

  }


  private evaVD(ret){
    let returnArray = [];
    returnArray[0] = ret.split("<meta http-equiv=\"refresh\" content=\"10; URL=")[1].split("\">")[0];
    let arr = [];
    $(ret).find("table.mon_list").children("tbody").children("tr.list").each(function (index, v) {
      if (index == 0) return;
      v = $(v);
      if (v.children().length == 1) arr.push({stufe: $(v.children()[0]).html().split(" ")[0]});
      else{
        let s = [];
        if($(v.children()[2]).html().match("-") != null) $(v.children()[2]).html().split("-").forEach((idk) => {s.push(idk.replace(" ", ""))});
        else s.push($(v.children()[2]).html().replace(" ", ""));
        s.forEach((ss) => {
          arr[arr.length - 1].date = $(v.children()[0]).html().replace(" ", "");
          arr[arr.length - 1].fach = $(v.children()[2]).html().replace(" ", "");
          arr[arr.length - 1].type = $(v.children()[3]).html().replace(" ", "").replace("<b>", "").replace("</b>", "");
          arr[arr.length - 1].oldRaum = $(v.children()[4]).html().replace(" ", "");
          arr[arr.length - 1].newRaum = $(v.children()[5]).html().replace(" ", "");
          arr[arr.length - 1].info = $(v.children()[6]).html().replace(" ", "");
          arr[arr.length - 1].stunde = ss;
        });
      }
    });
    returnArray[1] = arr;
    return returnArray;
  }

  private compileVD(slides){
    let arr = [];
    slides.forEach((a) => {
      let i = undefined;
      a.forEach((t) => {
        arr.forEach((arrT, ind) =>{
          if (t.stufe == arrT.stufe) i = ind;
        });
      });
      if (i){
        a.forEach((idk, ii) => {
          arr[i].push(idk);
        });
      }else {
        arr.push([]);
        a.forEach((idk) => {
          arr[arr.length - 1].push(idk);
        });
      }
    });
    return arr;
  }

  getkurse(stufe: string, stufeid: number): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this.wochen[0] || !this.wochen[1]) reject('Internal Error: #01');

      const res = this.baseService.makeConnections(CONFIG.baseKursURL + this.wochen[0] + '/c/c' + this.generate5(stufeid) + '.htm');
      if (res === null) reject('Failure: Connection could not be made');
      res.subscribe(
        (r) => {
          this.evaKurse(r, ((this.wochen[0] % 2) === 0) ? 'a' : 'b', stufe);

          //woche 2
          const res2 = this.baseService.makeConnections(CONFIG.baseKursURL + this.wochen[1] + '/c/c' + this.generate5(stufeid) + '.htm');
          res2.subscribe(
            (r) => {
              this.evaKurse(r, ((this.wochen[1] % 2) === 0) ? 'a' : 'b', stufe);
              let k = [];
              this._kurse[0].kurse.forEach((val) => {
                this._kurse[1].kurse.forEach((val2) => {
                  if (val2 === val) k.push(val);
                });
              });
              let fin = [];
              this._kurse[0].kurse.forEach((val) => {
                if (k.indexOf(val) === -1) fin.push(val);
              });
              this._kurse = [{kurse: []},{kurse: []}];
              resolve(fin);
            }
          );

        },
        (err) => {
          console.log(err);
          reject('Failure: ' + err.statusText);
        }
      );

    });

  }

  get stufen(): Promise<string[]> {
    return new Promise((resolve, reject) => {

      if (this._stufen) resolve(this._stufen);
      const resp = this.baseService.makeConnections(CONFIG.credentialsCheckUrl);
      if (resp === null) {
        this.alertService.alert('Failure: No Credentials given, how did you even get here?', this.alertService.DANGER);
        reject();
      }
      resp.subscribe(
        (wert) => {
          // save weeks
          const w = wert.split('<option value="');
          this.wochen[0] = w[1][0] + w[1][1];
          this.wochen[1] = w[2][0] + w[2][1];

          const a = wert.split('var classes = ')[1].split(';')[0].replace(/(")|(\[)|(])|( )/g, '').split(',');
          localStorage.stufen = JSON.stringify(a);
          this._stufen = a;
          resolve(this._stufen);
        },
        (err) => {
          console.log(err);
          this.alertService.alert('Failure: ' + err.statusText, this.alertService.DANGER);
        }
      );
    });
  }

  private generate5(id: number): string {
    let s = '' + id;
    while (s.length < 5) {
      s = '0' + s;
    }
    return s;
  }

  saveKurse(kurse): Promise<number>{
    return new Promise<number>((resolve, reject) => {
      let id = Math.floor(Math.random() * 9999);
      while (id.toString().length !== 4) id = Math.floor(Math.random() * 9999);
      let kurseAO = toObject(kurse);
      if (this.saveKurseTrys === 0) id = 4933;
      this.httpClient.put(CONFIG.dbUrl + id + '.json', kurseAO).subscribe(
        (wert) => {
            localStorage.kursID = id;
            resolve(id);
          },
        (err) => {
          if (this.saveKurseTrys < 5){
            console.log(err);
            this.saveKurseTrys++;
            this.saveKurse(kurse).then((id) => {
              resolve(id);
            });
          }else reject(err);
        }
      );
    });
  }

  fetchCloud(id: number): Promise<any>{
    return new Promise((resolve, reject) => {
      this.baseService.makeConnections(CONFIG.dbUrl + id + '.json').subscribe(
        (json) => {
          const njson = JSON.parse(json);
          if (njson === null) reject({statusText: 'Falsche ID'});
          else if (njson.error){
            reject({statusText: njson.error});
          }
          else {
            localStorage.kursID = id;
            resolve(njson);
          }
        },
        (err) => { reject(err) },
      );
    });
  }

  private evaKurse(r, ABWOCHE, stufe){
    let arr = [];
    let orig = $(r.replace(/\r?\n|\r/g, '').toUpperCase());
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
            let what = (ABWOCHE === "a")? 0:1;

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
        val.tt.push(tt);
        b = false;
      }
    });
    if (b)
      this.tempTTs.push({
        stufe: stufe,
        tt: [tt]
      });
  }

  getTT(stufe){
    console.log(stufe);
    console.log(this.tempTTs);
    let r = null;
    this.tempTTs.forEach((val) => { if (val.stufe === stufe) r = val.tt; });
    return r;
  }
}
function toObject(array: any[]){
  let Obj = {};
  array.forEach((val, i) => {
    Obj[i] = val;
  });
  return Obj;
}

