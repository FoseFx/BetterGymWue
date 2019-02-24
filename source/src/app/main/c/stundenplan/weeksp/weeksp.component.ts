import {ChangeDetectionStrategy, Component, Input} from '@angular/core';


type TTS = {woche: string, tt: {fach: string, hasDouble: boolean, raum: string, sel: boolean}[][][]}[];
type WeekTTs = {woche: string, tt: {fach: string, hasDouble: boolean, raum: string}[][]}[];


@Component({
  selector: 'app-weeksp',
  templateUrl: './weeksp.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeekspComponent {

  constructor() { }

  TAGE = ["Mo", "Di", "Mi", "Do", "Fr"];
  weekTTs: WeekTTs;

  @Input() set tts(tts: TTS) {
  	this.weekTTs = this.generateWeekTTs(tts);
	}

	generateWeekTTs(tts: TTS): WeekTTs{
		let newTTs: WeekTTs = []; // this will be returned

		tts.forEach((wocheOrig) => { // el: woche (A|B)

			let newTT = {woche: wocheOrig.woche, tt: []};

			wocheOrig.tt.forEach((tagOrig, tagIndex) => {

				let deepness = 0;

				tagOrig.forEach((stundeOrig, stundeIndex) => {

					if(!newTT.tt[stundeIndex]){ 		// wenn die stunde noch nie erreicht wurde, hinzufügen
						newTT.tt[stundeIndex] = [];
						if(deepness > 1){							// padding hinzufügen
							// console.log("deepness", deepness, stundeIndex, stundeOrig);
							for(let i = 0; i <= deepness; i++)
								newTT.tt[stundeIndex].push(null);
						}

					}

					const selStunde = this.getSelectedStunde(stundeOrig);
					newTT.tt[stundeIndex].push(selStunde);
					deepness = newTT.tt[stundeIndex].length;

				});
				// fill the rest
				for (let i = tagOrig.length; i !== newTT.tt.length; i++)
					newTT.tt.forEach(s => {
						if(!s[tagIndex])
							s[tagIndex] = null;
					});
			});

			// console.log(newTT);
			// console.table(newTT.tt);
			newTTs.push(newTT); // add week to returning array

		});



		return newTTs;
	}

	getSelectedStunde(stunde: {fach: string, hasDouble: boolean, raum: string, sel: boolean}[]) : {fach: string, hasDouble: boolean, raum: string}{
		let el = null;
		stunde.forEach((fach) => {
			if(fach.sel)
				el = {fach: fach.fach, hasDouble: fach.hasDouble, raum: fach.raum};
		});
		if(el === null)
			return null;
		// return {fach: "Frei", hasDouble: false, raum: ""};
		else
			return el;
	}

}
