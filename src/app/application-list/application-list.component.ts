import { Component, OnInit } from '@angular/core';
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
    private connectService: ConnectService
  ) { }

  ngOnInit() {
    this.getApplicationList();
  }

  async getApplicationList() {
    const address = this.connectService.getAddress();
    this.applications = await this.transcriptService.getTranscripts(address);
  }

  viewApplication(address: string) {
    console.log(address);
  }

}
