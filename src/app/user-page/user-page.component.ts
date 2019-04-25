import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  constructor(
    private zone: NgZone,
    private router: Router
  ) { }

  ngOnInit() {
  }

  public navigate(commands: any[]): void {
    this.zone.run(() => this.router.navigate(commands)).then();
  }

}
