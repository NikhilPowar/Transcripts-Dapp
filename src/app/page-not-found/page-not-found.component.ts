import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

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
