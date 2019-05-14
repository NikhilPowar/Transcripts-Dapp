import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectService } from '../connect.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  idContractAddress;

  constructor(
    private connectService: ConnectService,
    private router: Router,
    private zone: NgZone
  ) { }

  ngOnInit() {
  }

  logout() {
    this.connectService.disconnect();
    this.zone.run(() => this.router.navigate(['connect'])).then();
  }

}
