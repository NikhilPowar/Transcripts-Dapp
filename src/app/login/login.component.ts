import { Component, NgZone } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { EntityListService } from '../entity-list.service';
import { ConnectService } from '../connect.service';
import { ModalDialogService } from '../modal-dialog.service';

@Component({
  selector: 'app-login',
  providers: [LoginService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public loginForm: FormGroup;
  public username = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]+')]);
  public loginType = new FormControl('', [Validators.required]);
  public showPopup: boolean;
  public popupInput: string;
  public showAuthenticationError: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private connectService: ConnectService,
    private entityListService: EntityListService,
    private router: Router,
    private modalDialogService: ModalDialogService,
    private zone: NgZone
  ) {
    this.showPopup = false;
    this.loginForm = this.formBuilder.group({
      'username': this.username,
      'loginType': this.loginType
    });
  }

  getRandomInteger() {
    const max = Number.MAX_SAFE_INTEGER;
    return Math.floor(Math.random() * (max + 1));
  }

  specialLogin() {
    const nonce = this.getRandomInteger();
    let success = false;
    this.modalDialogService.openDialog('Login', 'Scan the QR code using the wallet used for your account.');
    this.loginService.loginSpecial(nonce).then(event => {
      event.on('data', response => {
        console.log(response);
        this.modalDialogService.closeDialog();
        const address = response.returnValues.sender;
        const receivedNonce = response.returnValues.nonce;
        console.log(receivedNonce);
        if (nonce.toString() === receivedNonce) {
          if (this.loginType.value === 'admin') {
            this.entityListService.getAdminList().then((admins) => {
              console.log(admins);
              if (admins.includes(address)) {
                success = true;
                this.connectService.setIDContractAddress(address);
                this.connectService.setRole('admin');
                this.zone.run(() => this.router.navigate(['admin-page'])).then();
              } else {
                this.showAuthenticationError = true;
              }
            });
          } else {
            this.entityListService.getProvidersList().then((providers) => {
              console.log(providers);
              providers.forEach(provider => {
                if (provider['addr'] === address) {
                  success = true;
                  this.connectService.setIDContractAddress(address);
                  this.connectService.setRole('provider');
                  this.zone.run(() => this.router.navigate(['application-list'])).then();
                }
              });
              this.showAuthenticationError = true;
            });
          }
        }
      });
    });
    this.delay(300000).then(() => {
      if (!success) {
        this.modalDialogService.closeDialog();
        alert('The login attempt timed out.');
      }
    });
  }

  loginTypeChanged() {
    this.showAuthenticationError = false;
    if (this.loginType.value !== 'student') {
      this.username.disable();
    } else {
      this.username.enable();
    }
  }

  onSubmit() {
    this.showPopup = false;
    if (this.loginForm.invalid) {
      return;
    }
    if (this.loginType.value === 'admin' || this.loginType.value === 'college') {
      this.specialLogin();
    } else {
      this.studentLogin();
    }
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  studentLogin() {
    let success = false;
    this.modalDialogService.openDialog('Verify Login', 'Scan the QR code using the wallet used for account creation.');
    this.loginService.login('transcripts', this.username.value).then((result) => {
      if (result === 'non-existent domain') {
        this.modalDialogService.closeDialog();
        this.popupInput = this.username.value;
        this.showPopup = true;
        success = true;
        return;
      }
      result.on('data', (response) => {
        this.modalDialogService.closeDialog();
        this.loginService.setIDContractAddress();
        this.connectService.setRole('student');
        success = true;
        this.zone.run(() => this.router.navigate(['user-page'])).then();
      });
    });
    this.delay(300000).then(() => {
      if (!success) {
        alert('The login attempt timed out.');
        this.modalDialogService.closeDialog();
      }
      return;
    });
  }

  getErrorMessage(attribute: FormControl) {
    return attribute.hasError('required') ? 'This field is required' :
        attribute.hasError('pattern') ? 'Name can only contain letters' : '';
  }

  hidePopup() {
    this.showPopup = false;
  }
}
