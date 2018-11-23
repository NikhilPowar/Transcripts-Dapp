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

  connect() {
    this.connectService.connect();
    this.router.navigate(['application']);
  }

}
