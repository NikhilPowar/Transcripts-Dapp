import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RegisterService } from '../register.service';
import { Router } from '@angular/router';
import { ModalDialogService } from '../modal-dialog.service';
import { ConnectService } from '../connect.service';

@Component({
  selector: 'app-login-popup',
  providers: [RegisterService],
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.css']
})
export class LoginPopupComponent {
  @Input() name: string;

  @Input() show: boolean;
  @Output() showChange = new EventEmitter<boolean>();

  constructor(
    private registerService: RegisterService,
    private router: Router,
    private modalDialogService: ModalDialogService,
    private connectService: ConnectService
  ) { }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  createAccount() {
    let success = false;
    this.modalDialogService.openDialog('Register', 'Scan the QR code with your preferred mobile wallet.');
    this.registerService.register('transcripts', this.name).then((event) => {
      event.on('data', (response) => {
        this.modalDialogService.closeDialog();
        this.delay(1000).then(() => {
          const idContractAddress = response.returnValues.idContractAddress;
          console.log(idContractAddress);
          this.modalDialogService.openDialog('Register', 'Scan the QR code with the same mobile wallet.');
          this.registerService.createSubdomain(idContractAddress, 'transcripts', this.name).then((event2) => {
            if (event2 === 'failure') {
              this.modalDialogService.closeDialog();
              alert('The registration attempt timed out.');
              return;
            }
            event2.on('data', (response2) => {
              this.modalDialogService.closeDialog();
              console.log(response2);
              console.log('Registration successful');
              this.connectService.setIDContractAddress(idContractAddress);
              success = true;
              this.router.navigate(['user-page']);
            });
          });
          this.delay(300000).then(() => {
            if (!success) {
              this.modalDialogService.closeDialog();
              alert('The registration attempt timed out.');
            }
          });
        });
      });
    });
    this.delay(600000).then(() => {
      if (!success) {
        this.modalDialogService.closeDialog();
        alert('The registration attempt timed out.');
      }
    });
  }

  closePopup() {
    this.show = false;
    this.showChange.emit();
  }
}
