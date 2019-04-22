import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { ConnectService } from './connect.service';

@Injectable({
  providedIn: 'root'
})
export class Web3ConnectedGuard implements CanActivate {
  constructor(
    private connectService: ConnectService
  ) { }

  canActivate() {
    console.log('Web3 guard active');
    if (this.connectService.getWSW3() == null && this.connectService.getWeb3() == null) {
      return false;
    } else {
      return true;
    }
  }
}
