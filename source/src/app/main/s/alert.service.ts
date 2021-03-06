import {Injectable} from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class AlertService {

  id = 0;
  public DANGER = 1;
  public OK = 2;
  constructor(private snackBar: MatSnackBar) {}

  alert(text: string, type?: number, time?: number) {
    time = time || 3000;
    if(type === this.DANGER) text = '\u26D4 ' + text;
    if(type === this.OK) text = '\ud83c\udf55 ' + text;
    this.snackBar.open(text,undefined, {duration: time});
  }

}
