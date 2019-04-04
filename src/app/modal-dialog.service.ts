import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { ModalDialogComponent } from './modal-dialog/modal-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ModalDialogService {
  dialogRef: MatDialogRef<ModalDialogComponent>;
  constructor(
    private dialog: MatDialog
  ) { }

  openDialog (title: string, desc: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: title,
      description: desc
    };
    this.dialogRef = this.dialog.open(ModalDialogComponent, dialogConfig);
    console.log(this.dialogRef);
  }

  closeDialog () {
    this.dialogRef.close();
  }
}
