import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  providers: [LoginService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  username: FormControl;
  usernameString: string;
  loading = false;
  submitted = false;
  showPopup = false;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    this.showPopup = false;
    if (this.loginForm.invalid) {
      return;
    }
    this.usernameString = this.loginForm['value']['username'];
    console.log(this.loginForm);
    this.loginService.login('transcripts', this.usernameString).then((success) => {
      if (success) {
        this.loading = true;
        this.router.navigate(['user-page']);
      } else {
        this.showPopup = true;
      }
    });
  }

  hidePopup() {
    this.showPopup = false;
  }
}
