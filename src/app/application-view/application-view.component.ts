import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { ContractService } from '../contract.service';

@Component({
  selector: 'app-application-view',
  templateUrl: './application-view.component.html',
  styleUrls: ['./application-view.component.css']
})
export class ApplicationViewComponent implements OnInit {
  transcriptAddress;
  transcriptContract;
  // tslint:disable-next-line:max-line-length
  abi = [ { 'inputs': [ { 'name': 'id', 'type': 'address' }, { 'name': 'provAddress', 'type': 'address' } ], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'constructor' }, { 'constant': true, 'inputs': [], 'name': 'getTranscriptHash', 'outputs': [ { 'name': '', 'type': 'string' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': true, 'inputs': [], 'name': 'getTranscriptOwner', 'outputs': [ { 'name': '', 'type': 'address' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': false, 'inputs': [ { 'name': 's', 'type': 'string' } ], 'name': 'setTranscriptHash', 'outputs': [ { 'name': '', 'type': 'string' } ], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function' } ];

  constructor(
    private route: ActivatedRoute,
    private contractService: ContractService
  ) { }

  ngOnInit() {
    this.transcriptAddress = this.route.paramMap.pipe(map(params => params.get('transcriptAddress') || 'None'));
    if (this.transcriptAddress !== 'None') {
      this.getTranscriptData();
    }
  }

  async getTranscriptData() {
    this.transcriptContract = this.contractService.accessContract(this.transcriptAddress, this.abi);
    console.log(this.transcriptContract);
    console.log(await this.transcriptContract.getTranscriptHash().call());
    console.log(await this.transcriptContract.getTranscrioptOwner().call());
  }

  uploadTranscript() {

  }

}
