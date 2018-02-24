import {Injectable} from '@angular/core';
import * as $ from 'jquery';

@Injectable()
export class AlertService {

  id = 0;
  public DANGER = 1;
  public OK = 2;

  constructor() {}

  alert(text: string, type?: number) {
    let t = 'alert-success';
    if (type) {
      if (type === this.DANGER) t = 'alert-danger';
      if (type === this.OK) t = 'alert-success';
    }
    this.id++;
    $('#rootRoute').append(`
      <div id='alert` + this.id + `' class="alert alert-dismissible ` + t + `">
        <button type="button" class="close" data-dismiss="alert">&times;</button>
        ` + text + `
      </div>
    `);
    setTimeout(() => {
      $('#alert' + this.id).css('opacity', '0');
      setTimeout(() => {
        $('#alert' + this.id).remove();
      }, 300);
    }, 3000);
  }

}
