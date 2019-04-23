import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { ConnectService } from './connect.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {
  constructor(
    private connectService: ConnectService
  ) { }

  canActivate() {
    console.log('Log-in guard active');
    if (this.connectService.getIDContractAddress() == null) {
      return false;
    } else {
      return true;
    }
  }
}
