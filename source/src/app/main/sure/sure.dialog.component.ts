import { Component } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-sure',
  template: `
    <h4 mat-dialog-title>Willst du das wirklich?</h4>
    <div mat-dialog-actions>
      <button mat-button (click)="close()" cdkFocusInitial>Abbrechen</button>
      <button mat-button [mat-dialog-close]="true" color="red">Löschen</button>
    </div>

  `
})
export class SureDialogComponent {

  constructor(public dialogRef: MatDialogRef<SureDialogComponent>,) { }

  close(){
    this.dialogRef.close();
  }

}
