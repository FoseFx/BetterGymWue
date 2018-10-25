import {CONFIG} from "../../../conf";
import {NetwService} from "./netw.service";
import {Kurs} from "../../../Classes";

export function saveKurse(kurse, that: NetwService): Promise<number>{
  return new Promise<number>((resolve, reject) => {
    let id = Math.floor(Math.random() * 9999);
    while (id.toString().length !== 4) id = Math.floor(Math.random() * 9999);
    let kurseAO: {stufe?: string} = toObject(kurse);
    kurseAO.stufe = that.baseService.myStufe;
    that.baseService.httpClient.put(CONFIG.dbUrl + id + '.json', kurseAO).subscribe(
      (wert) => {
        localStorage.kursID = id;
        that.baseService.kursID = id;
        resolve(id);
      },
      (err) => {
        if (that.saveKurseTrys < 5){
          console.log(err);
          that.saveKurseTrys++;
          that.saveKurse(kurse).then((id) => {
            resolve(id);
          });
        }else reject(err);
      }
    );
  });
}


export function fetchCloud(id: number, that): Promise<Kurs[]>{
  return new Promise((resolve, reject) => {
    that.baseService.makeConnections(CONFIG.dbUrl + id + '.json').subscribe(
      (json) => {
        const njson = JSON.parse(json);
        if (njson === null) reject({statusText: 'Falsche ID'});
        else if (njson.error){
          reject({statusText: njson.error});
        }
        else if (njson.stufe !== that.baseService.myStufe){
          reject({statusText: 'ID gehört zu Stufe/Klasse ' + njson.stufe});
        }
        else {
          localStorage.kursID = id;
          resolve(toArray(njson));
        }
      },
      (err) => { reject(err) },
    );
  });
}

function toObject(array: any[]){
  let Obj = {};
  array.forEach((val, i) => {
    Obj[i] = val;
  });
  return Obj;
}

function toArray(obj){
  if(Array.isArray(obj)) return obj;
  let arr = [];
  delete obj.stufe;
  for (let key in obj){
    arr.push(obj[key]);
  }
  return arr;
}
