import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { ModalDialogComponent } from './modal-dialog/modal-dialog.component';
import { ConnectService } from './connect.service';

@Injectable({
  providedIn: 'root'
})
export class ModalDialogService {
  dialogRef: MatDialogRef<ModalDialogComponent>;
  constructor(
    private dialog: MatDialog,
    private connectService: ConnectService
  ) { }

  openDialog (title: string, desc: string) {
    console.log('In modal dialog service.');
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    if (this.connectService.getWalletType() === 'METAMASK') {
      dialogConfig.data = {
        title: title,
        description: 'Please wait while transaction completes.'
      };
    } else {
      dialogConfig.data = {
        title: title,
        description: desc
      };
    }
    this.dialogRef = this.dialog.open(ModalDialogComponent, dialogConfig);
    console.log(this.dialogRef);
  }

  closeDialog () {
    this.dialogRef.close();
    this.dialogRef._containerInstance.dispose();
  }
}
