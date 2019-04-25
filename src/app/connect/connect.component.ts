import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectService } from '../connect.service';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.css']
})
export class ConnectComponent implements OnInit {

  constructor(
    private connectService: ConnectService,
    private router: Router
  ) { }

  ngOnInit() { }

  connectMobileWallet() {
    this.connectService.connect('MOBILE_WALLET');
    this.router.navigate(['login']);
  }

  connectMetamask() {
    this.connectService.connect('METAMASK');
    this.router.navigate(['login']);
  }

}
