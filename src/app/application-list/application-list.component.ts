import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranscriptService } from '../transcript.service';
import { ConnectService } from '../connect.service';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.css']
})
export class ApplicationListComponent implements OnInit {
  applications: string[];

  constructor(
    private transcriptService: TranscriptService,
    private connectService: ConnectService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getApplicationList();
  }

  async getApplicationList() {
    const address = this.connectService.getIDContractAddress();
    this.applications = await this.transcriptService.getTranscripts(address);
    console.log(this.applications);
  }

  viewApplication(address: string) {
    console.log(address);
    this.router.navigate(['application-list', address]);
  }

}
