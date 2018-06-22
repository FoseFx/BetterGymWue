import { Injectable } from '@angular/core';

@Injectable()
export class IndexedDBService {

  constructor() { }
  save(){
    let request = indexedDB.open("OfflineData", 2), db, tx, store;

    request.onerror = function (e) {
      console.error(e)
    };

    request.onsuccess = function (e) {
      db = request.result;
      tx = db.transaction('DataStore', 'readwrite');
      store = tx.objectStore('DataStore', {keyPath: 'key'});

      db.onerror = function (e) {
        console.error(e);
      };
      let obj:any = {};
      if(!!localStorage.TT) obj.TT = JSON.parse(localStorage.TT);
      if(!!localStorage.myKurse) obj.myKurse = JSON.parse(localStorage.myKurse);
      store.put({data: obj}, 'key');
      tx.oncomplete = function (  ) {
        db.close();
      }
    };

    request.onupgradeneeded = function (e) {
      db = request.result;
      store = db.createObjectStore("DataStore");
    };
  }
}
