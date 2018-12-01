import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContractService } from '../contract.service';
import { IpfsService } from '../ipfs.service';
import { ConnectService } from '../connect.service';

@Component({
  selector: 'app-application-view',
  templateUrl: './application-view.component.html',
  styleUrls: ['./application-view.component.css']
})
export class ApplicationViewComponent implements OnInit {
  transcriptAddress;
  transcriptContract;
  buffer;
  // tslint:disable-next-line:max-line-length
  abi = [ { 'inputs': [ { 'name': 'id', 'type': 'address' }, { 'name': 'provAddress', 'type': 'address' } ], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'constructor' }, { 'constant': true, 'inputs': [], 'name': 'getTranscriptHash', 'outputs': [ { 'name': '', 'type': 'string' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': true, 'inputs': [], 'name': 'getTranscriptOwner', 'outputs': [ { 'name': '', 'type': 'address' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': false, 'inputs': [ { 'name': 's', 'type': 'string' } ], 'name': 'setTranscriptHash', 'outputs': [ { 'name': '', 'type': 'string' } ], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function' } ];

  constructor(
    private route: ActivatedRoute,
    private contractService: ContractService,
    private ipfsService: IpfsService,
    private connectService: ConnectService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.transcriptAddress = params.transcriptAddress;
      console.log(this.transcriptAddress);
      if (this.transcriptAddress !== 'None') {
        this.getTranscriptData();
      }
    });
  }

  async getTranscriptData() {
    this.transcriptContract = this.contractService.accessContract(this.transcriptAddress, this.abi);
    console.log(this.transcriptContract);
    console.log(await this.transcriptContract.methods.getTranscriptHash().call());
    console.log(await this.transcriptContract.methods.getTranscriptOwner().call());
  }

  async convertFileToBuffer(event) {
    const file = event.target.files[0];
    let fileDataArray;
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.onloadend = async () => {
      console.log(fileReader.result);
      fileDataArray = fileReader.result;
      const buffer = await Buffer.from(fileDataArray);
      console.log(buffer);
      this.buffer = buffer;
    };
  }

  async uploadTranscript() {
    console.log(this.buffer);
    const hash = await this.ipfsService.store(this.buffer);
    console.log('Storage done.');
    const from = this.connectService.getAddress();
    await this.transcriptContract.methods.setTranscriptHash(hash).send({from: from});
    console.log(await this.transcriptContract.methods.getTranscriptHash().call());
  }

}
