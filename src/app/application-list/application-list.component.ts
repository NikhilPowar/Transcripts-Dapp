import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranscriptService } from '../transcript.service';
import { ConnectService } from '../connect.service';
import { ContractService } from '../contract.service';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.css']
})
export class ApplicationListComponent implements OnInit {
  applications: any[];
  // tslint:disable-next-line:max-line-length
  transcriptApplicationAbi = [ { 'constant': true, 'inputs': [], 'name': 'name', 'outputs': [ { 'name': '', 'type': 'string' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': true, 'inputs': [], 'name': 'courseName', 'outputs': [ { 'name': '', 'type': 'string' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': true, 'inputs': [], 'name': 'id', 'outputs': [ { 'name': '', 'type': 'string' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': true, 'inputs': [], 'name': 'courseCompletionYear', 'outputs': [ { 'name': '', 'type': 'uint256' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': true, 'inputs': [], 'name': 'courseStartYear', 'outputs': [ { 'name': '', 'type': 'uint256' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'inputs': [ { 'name': '_owner', 'type': 'address' }, { 'name': '_provider', 'type': 'address' }, { 'name': '_name', 'type': 'string' }, { 'name': '_id', 'type': 'string' }, { 'name': '_courseName', 'type': 'string' }, { 'name': '_startYear', 'type': 'uint256' }, { 'name': '_completionYear', 'type': 'uint256' } ], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'constructor' }, { 'constant': true, 'inputs': [], 'name': 'getTranscriptHash', 'outputs': [ { 'name': '', 'type': 'string' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': true, 'inputs': [], 'name': 'getTranscriptOwner', 'outputs': [ { 'name': '', 'type': 'address' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': false, 'inputs': [ { 'name': 's', 'type': 'string' } ], 'name': 'setTranscriptHash', 'outputs': [ { 'name': '', 'type': 'string' } ], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function' } ];

  constructor(
    private transcriptService: TranscriptService,
    private connectService: ConnectService,
    private contractService: ContractService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getApplicationList();
  }

  async getApplicationList() {
    // TODO: Remove Comment
    // const address = this.connectService.getIDContractAddress();
    // this.applications = await this.transcriptService.getTranscripts(address);
    let addresses = [];
    addresses = await this.transcriptService.getTranscripts('0x5E4eE285830bAdcc57f056a03Ffbc1f2a1797E00');
    this.applications = [];
    addresses.forEach(async address => {
      const contract = this.contractService.accessContract(address, this.transcriptApplicationAbi);
      // tslint:disable-next-line:prefer-const
      let application = [];
      application['address'] = address;
      application['name'] = await contract.methods.name().call();
      application['id'] = await contract.methods.id().call();
      application['course_name'] = await contract.methods.courseName().call();
      application['course_start'] = await contract.methods.courseStartYear().call();
      application['course_end'] = await contract.methods.courseCompletionYear().call();
      this.applications.push(application);
    }, this);
    console.log(this.applications);
  }

  viewApplication(address: string) {
    console.log(address);
    this.router.navigate(['application-view', address]);
  }

}
