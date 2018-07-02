self.addEventListener('push', function(event){
    console.log('push',event);


    let request = indexedDB.open("OfflineData", 2), db, tx, store;

    request.onerror = function (e) {
      console.error(e)
    };

    request.onsuccess = function (e) {
      db = request.result;
      tx = db.transaction('DataStore', 'readonly');
      store = tx.objectStore('DataStore');

      db.onerror = function (e) {
        console.error(e);
      };

      let q = store.get('key');
      q.onsuccess = function(){
        let data = q.result.data;
        console.log(data);
        let tt = data.TT;
        let myKurse = data.myKurse;
        let date = new Date();

        while (date.getDay() === 0 || date.getDay() === 6)
          date.setDate(date.getDate() + 1);
        let weeksTT = tt[(getWeekNumber(date) % 2 === 0) ? 0: 1];
        tt = {tag: weeksTT.days[date.getDay() - 1], date: date};
        console.log(tt);

        let body = ``;
        let arr = [];
        tt.tag.forEach((g)=>{if(!!g.fach){arr.push(g)}});
        arr.forEach((g, i)=>{
          let kurs = myKurse.find(kurs => kurs.title === g.fach);
          if(kurs){
            if(g.raeume.find(k=>k.kurs === kurs.title))
              body += kurs.fach;
            else body += 'Frei';
          }
          if(i < arr.length - 1) body += ' ';
        });
        let tag = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag"][tt.date.getDay() - 1 ];
        self.registration.showNotification(`Stundenplan für ${tag} (indev)`, {body:body, icon: 'assets/logo/128.png'})
      };
      tx.oncomplete = function (  ) {
        db.close();
      }
    };

    request.onupgradeneeded = function (e) {
      db = request.result;
      store = db.createObjectStore("DataStore");
    };





});

function getWeekNumber(d) {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
  let yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}


self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});
