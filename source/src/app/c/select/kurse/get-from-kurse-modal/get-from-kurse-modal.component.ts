import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-get-from-kurse-modal',
  template: `
    <style>
      .center { display: block; margin: 0 auto;}
    </style>
    <h1 mat-dialog-title class="center">Kurs Cloud</h1>
    <div mat-dialog-content class="center" style="padding: 10px 0 0 0">
      <mat-form-field style="width: 100%; overflow-x: hidden">
        <input cdkFocusInitial type="tel" minlength="4" maxlength="4" placeholder="Kurs-Cloud ID" matInput [(ngModel)]="data.id">
      </mat-form-field>
    </div>
    <div mat-dialog-actions class="center" style="text-align: right; padding-bottom: 2px">
      <button mat-button (click)="onCancelClick()">Schließen</button>
      <button mat-button [mat-dialog-close]="valid" [disabled]="!valid">Ok</button>
    </div>

  `
})
export class GetFromKurseModalComponent {

  constructor(public dialogRef: MatDialogRef<GetFromKurseModalComponent>, @Inject(MAT_DIALOG_DATA) public data: GetFromKurseData) {}
  onCancelClick(){
    this.dialogRef.close();
  }

  valid = this.data.id && this.data.id.toString().length === 4;

}

export interface GetFromKurseData {
  failMsg?: string;
  id?: number;
}
