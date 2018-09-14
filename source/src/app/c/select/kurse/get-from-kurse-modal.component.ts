import {Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-get-from-kurse-modal',
  template: `
    <style>
      .center { display: block; margin: 0 auto;}
    </style>
    <h1 mat-dialog-title class="center">Kurs Cloud</h1>
    <div mat-dialog-content class="center" style="padding: 10px 0 0 0">
      <p *ngIf="!!data.failMsg" class="text-danger"><b>{{data.failMsg}}</b></p>
      <mat-form-field style="width: 100%; overflow-x: hidden">
        <input 
          (keyup)="onChange($event)" 
          cdkFocusInitial 
          type="tel" 
          minlength="4" 
          maxlength="4" 
          placeholder="Kurs-Cloud ID" 
          matInput
          [(ngModel)]="data.id">
        
      </mat-form-field>
    </div>
    <div mat-dialog-actions class="center" style="text-align: right; padding-bottom: 2px">
      <button mat-button (click)="onCancelClick()">Schließen</button>
      <button mat-button [mat-dialog-close]="data" [disabled]="!valid">Ok</button>
    </div>

  `
})
export class GetFromKurseModalComponent {
  constructor(public dialogRef: MatDialogRef<GetFromKurseModalComponent>, @Inject(MAT_DIALOG_DATA) public data: GetFromKurseData) {}
  onCancelClick(){
    this.dialogRef.close();
  }


  valid = false;
  onChange(e: KeyboardEvent) {
    this.valid = !this.data.id ? false : this.data.id.toString().length === 4 && !isNaN(+this.data.id);
    if(e.key === "Enter" && this.valid)
      this.dialogRef.close(this.data);
  }
}

export interface GetFromKurseData {
  failMsg?: string;
  id?: number;
}
