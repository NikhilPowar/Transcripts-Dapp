import { Component, OnInit } from '@angular/core';
import { IpfsService } from '../ipfs.service';
import { BlockchainService } from '../blockchain.service';
import { ActivatedRoute } from '@angular/router';
import { ConnectService } from '../connect.service';

@Component({
  selector: 'app-shared-view',
  templateUrl: './shared-view.component.html',
  styleUrls: ['./shared-view.component.css']
})
export class SharedViewComponent implements OnInit {
  transcriptAddress: string;
  transcriptContract: any;
  buffer: Buffer;
  transcript: any;
  loading: boolean;
  // tslint:disable-next-line:max-line-length
  abi = [ { 'constant': true, 'inputs': [], 'name': 'name', 'outputs': [ { 'name': '', 'type': 'string' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': true, 'inputs': [], 'name': 'courseName', 'outputs': [ { 'name': '', 'type': 'string' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': true, 'inputs': [], 'name': 'id', 'outputs': [ { 'name': '', 'type': 'string' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': true, 'inputs': [], 'name': 'courseCompletionYear', 'outputs': [ { 'name': '', 'type': 'uint256' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': true, 'inputs': [], 'name': 'courseStartYear', 'outputs': [ { 'name': '', 'type': 'uint256' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'inputs': [ { 'name': '_owner', 'type': 'address' }, { 'name': '_provider', 'type': 'address' }, { 'name': '_name', 'type': 'string' }, { 'name': '_id', 'type': 'string' }, { 'name': '_courseName', 'type': 'string' }, { 'name': '_startYear', 'type': 'uint256' }, { 'name': '_completionYear', 'type': 'uint256' } ], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'constructor' }, { 'constant': true, 'inputs': [], 'name': 'getTranscriptHash', 'outputs': [ { 'name': '', 'type': 'string' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': true, 'inputs': [], 'name': 'getTranscriptOwner', 'outputs': [ { 'name': '', 'type': 'address' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': false, 'inputs': [ { 'name': 's', 'type': 'string' } ], 'name': 'setTranscriptHash', 'outputs': [ { 'name': '', 'type': 'string' } ], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function' } ];

  constructor(
    private route: ActivatedRoute,
    private connectService: ConnectService,
    private ipfsService: IpfsService,
    private blockchainService: BlockchainService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.transcriptAddress = params.transcriptAddress;
      console.log(this.transcriptAddress);
      if (this.transcriptAddress !== 'None') {
        this.loading = true;
        this.getTranscriptData().then(() => {
          this.loading = false;
        });
      }
    });
  }

  async getTranscriptData() {
    if (!this.connectService.getWSW3()) {
      await this.connectService.connect();
    }
    this.transcriptContract = this.blockchainService.viewContract(this.transcriptAddress, this.abi);
    console.log(this.transcriptContract);
    this.transcript = {};
    this.transcript['hash'] = await this.transcriptContract.methods.getTranscriptHash().call();
    this.transcript['owner'] = await this.transcriptContract.methods.getTranscriptOwner().call();
    this.transcript['name'] = await this.transcriptContract.methods.name().call();
    this.transcript['id'] = await this.transcriptContract.methods.id().call();
    this.transcript['course_name'] = await this.transcriptContract.methods.courseName().call();
    this.transcript['course_start'] = await this.transcriptContract.methods.courseStartYear().call();
    this.transcript['course_end'] = await this.transcriptContract.methods.courseCompletionYear().call();
    if (this.transcript['hash'] !== 'Not set') {
      await this.downloadTranscript();
    }
  }

  async downloadTranscript() {
    const hash = this.transcript['hash'];
    console.log(hash);
    this.buffer = await this.ipfsService.retrieve(hash);
  }

  async convertBufferToFile() {
    const file = new Blob([this.buffer], {type: 'application/pdf'});
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL);
  }
}
