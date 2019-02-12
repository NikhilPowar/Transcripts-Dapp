import { Component, OnInit } from '@angular/core';
import { ConnectService } from '../connect.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  constructor(private connectService: ConnectService, ) { }

  ngOnInit() {
  }

  Logout() {
    this.connectService.setIDContractAddress('');
    this.connectService.setRole('');
  }
}
