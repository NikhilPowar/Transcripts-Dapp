import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { ConnectService } from './connect.service';

@Injectable({
  providedIn: 'root'
})
export class AdministratorGuard implements CanActivate {
  constructor(
    private connectService: ConnectService
  ) { }

  canActivate() {
    console.log('Admin guard active');
    if (this.connectService.getRole() === 'admin') {
      return true;
    } else {
      return false;
    }
  }
}
