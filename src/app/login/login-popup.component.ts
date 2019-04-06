import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RegisterService } from '../register.service';
import { Router } from '@angular/router';
import { ModalDialogService } from '../modal-dialog.service';

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
    private modalDialogService: ModalDialogService
  ) { }

  createAccount() {
    this.modalDialogService.openDialog('Register', 'Scan the QR code with your preferred mobile wallet.');
    this.registerService.register('transcripts', this.name).then((response) => {
      if (response === 'success') {
        console.log('Registration successful');
        this.router.navigate(['user-page']);
      } else {
        alert('The registration attempt timed out.');
        this.modalDialogService.closeDialog();
      }
    });
  }

  closePopup() {
    this.show = false;
    this.showChange.emit();
  }
}
