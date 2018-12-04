import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RegisterService } from '../register.service';
import { Router } from '@angular/router';

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
    private router: Router
  ) { }

  createAccount() {
    this.registerService.register('transcripts', this.name).then(() => {
      console.log('Registration successful');
    });
    this.router.navigate(['user-page']);
  }

  closePopup() {
    this.show = false;
    this.showChange.emit();
  }
}
