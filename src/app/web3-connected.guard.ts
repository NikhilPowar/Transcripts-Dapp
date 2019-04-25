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
    if (this.connectService.getWeb3() == null) {
      console.log('web3 guard failed');
      return false;
    } else {
      return true;
    }
  }
}
