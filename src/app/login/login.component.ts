import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

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

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.showPopup = false;
    this.loginForm = this.formBuilder.group({
      'username': this.username,
      'loginType': this.loginType
    });
  }

  onSubmit() {
    this.showPopup = false;
    if (this.loginForm.invalid) {
      return;
    }
    console.log(this.loginForm);
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
