import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { TranscriptService } from '../transcript.service';
import { ConnectService } from '../connect.service';
import { BlockchainService } from '../blockchain.service';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.css']
})
export class ApplicationListComponent implements OnInit {
  applications: any[];
  // tslint:disable-next-line:max-line-length
  transcriptApplicationAbi = [ { 'constant': true, 'inputs': [], 'name': 'name', 'outputs': [ { 'name': '', 'type': 'bytes32' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': true, 'inputs': [], 'name': 'courseName', 'outputs': [ { 'name': '', 'type': 'bytes32' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': true, 'inputs': [], 'name': 'id', 'outputs': [ { 'name': '', 'type': 'bytes32' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': true, 'inputs': [], 'name': 'courseCompletionYear', 'outputs': [ { 'name': '', 'type': 'uint256' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': true, 'inputs': [], 'name': 'courseStartYear', 'outputs': [ { 'name': '', 'type': 'uint256' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'inputs': [ { 'name': '_owner', 'type': 'address' }, { 'name': '_provider', 'type': 'address' }, { 'name': '_name', 'type': 'bytes32' }, { 'name': '_id', 'type': 'bytes32' }, { 'name': '_courseName', 'type': 'bytes32' }, { 'name': '_startYear', 'type': 'uint256' }, { 'name': '_completionYear', 'type': 'uint256' } ], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'constructor' }, { 'anonymous': false, 'inputs': [ { 'indexed': false, 'name': 'owner', 'type': 'address' }, { 'indexed': false, 'name': 'provider', 'type': 'address' }, { 'indexed': false, 'name': 'name', 'type': 'bytes32' }, { 'indexed': false, 'name': 'id', 'type': 'bytes32' }, { 'indexed': false, 'name': 'courseName', 'type': 'bytes32' }, { 'indexed': false, 'name': 'startYear', 'type': 'uint256' }, { 'indexed': false, 'name': 'completionYear', 'type': 'uint256' } ], 'name': 'TranscriptApplicationCreated', 'type': 'event' }, { 'anonymous': false, 'inputs': [ { 'indexed': false, 'name': 'collegeAddress', 'type': 'address' }, { 'indexed': false, 'name': 'transcriptHash', 'type': 'bytes32' } ], 'name': 'TranscriptHashSet', 'type': 'event' }, { 'constant': true, 'inputs': [], 'name': 'getTranscriptHash', 'outputs': [ { 'name': '', 'type': 'bytes32' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': true, 'inputs': [], 'name': 'getTranscriptOwner', 'outputs': [ { 'name': '', 'type': 'address' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': false, 'inputs': [ { 'name': 's', 'type': 'bytes32' } ], 'name': 'setTranscriptHash', 'outputs': [ { 'name': '', 'type': 'bytes32' } ], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function' } ];

  constructor(
    private transcriptService: TranscriptService,
    private connectService: ConnectService,
    private blockchainService: BlockchainService,
    private router: Router,
    private zone: NgZone
  ) { }

  ngOnInit() {
    this.getApplicationList();
  }

  async getApplicationList() {
    let addresses = [];
    const addr = this.connectService.getIDContractAddress();
    addresses = await this.transcriptService.getTranscripts(addr);
    this.applications = [];
    addresses.forEach(async address => {
      const contract = this.blockchainService.viewContract(address, this.transcriptApplicationAbi);
      const web3 = this.connectService.getWeb3();
      // tslint:disable-next-line:prefer-const
      let application = [];
      application['address'] = address;
      application['name'] = web3.utils.toAscii(await contract.methods.name().call());
      application['id'] = web3.utils.toAscii(await contract.methods.id().call());
      application['course_name'] = web3.utils.toAscii(await contract.methods.courseName().call());
      application['course_start'] = await contract.methods.courseStartYear().call();
      application['course_end'] = await contract.methods.courseCompletionYear().call();
      this.applications.push(application);
    }, this);
    console.log(this.applications);
  }

  viewApplication(address: string) {
    console.log(address);
    this.zone.run(() => this.router.navigate(['application-view', address])).then();
  }

}
