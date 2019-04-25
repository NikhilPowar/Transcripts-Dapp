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
    if (this.connectService.getWalletType() === 'METAMASK') {
      return;
    }
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
    if (this.connectService.getWalletType() === 'METAMASK') {
      return;
    }
    this.dialogRef.close();
    this.dialogRef._containerInstance.dispose();
  }
}
