import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { EntityListService } from '../entity-list.service';
import { ConnectService } from '../connect.service';

@Component({
  selector: 'app-login',
  providers: [LoginService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private loginForm: FormGroup;
  private username = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]+')]);
  private loginType = new FormControl('', [Validators.required]);
  private showPopup: boolean;
  private popupInput: string;
  private showAuthenticationError: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private connectService: ConnectService,
    private entityListService: EntityListService,
    private router: Router
  ) {
    this.showPopup = false;
    this.loginForm = this.formBuilder.group({
      'username': this.username,
      'loginType': this.loginType
    });
  }

  specialLogin() {
    const address = this.connectService.getAddress();
    if (this.loginType.value === 'admin') {
      this.entityListService.getAdminList().then((admins) => {
        if (admins.includes(address)) {
          this.router.navigate(['admin-page']);
        } else {
          this.showAuthenticationError = true;
        }
      });
    } else {
      this.entityListService.getProvidersList().then((providers) => {
        providers.forEach(provider => {
          if (provider['addr'] === address) {
            this.router.navigate(['application-list']);
          }
        });
        this.showAuthenticationError = true;
      });
    }
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

  studentLogin() {
    this.loginService.login('transcripts', this.username.value).then((success) => {
      if (success) {
        this.router.navigate(['application-list']);
      } else {
        this.popupInput = this.username.value;
        this.showPopup = true;
      }
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
