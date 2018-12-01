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
  abi = [ { 'constant': true, 'inputs': [], 'name': 'name', 'outputs': [ { 'name': '', 'type': 'string' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': true, 'inputs': [], 'name': 'courseName', 'outputs': [ { 'name': '', 'type': 'string' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': true, 'inputs': [], 'name': 'id', 'outputs': [ { 'name': '', 'type': 'string' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': true, 'inputs': [], 'name': 'courseCompletionYear', 'outputs': [ { 'name': '', 'type': 'uint256' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': true, 'inputs': [], 'name': 'courseStartYear', 'outputs': [ { 'name': '', 'type': 'uint256' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'inputs': [ { 'name': '_owner', 'type': 'address' }, { 'name': '_provider', 'type': 'address' }, { 'name': '_name', 'type': 'string' }, { 'name': '_id', 'type': 'string' }, { 'name': '_courseName', 'type': 'string' }, { 'name': '_startYear', 'type': 'uint256' }, { 'name': '_completionYear', 'type': 'uint256' } ], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'constructor' }, { 'constant': true, 'inputs': [], 'name': 'getTranscriptHash', 'outputs': [ { 'name': '', 'type': 'string' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': true, 'inputs': [], 'name': 'getTranscriptOwner', 'outputs': [ { 'name': '', 'type': 'address' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': false, 'inputs': [ { 'name': 's', 'type': 'string' } ], 'name': 'setTranscriptHash', 'outputs': [ { 'name': '', 'type': 'string' } ], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function' } ];

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
    console.log(await this.transcriptContract.getTranscriptOwner().call());
  }

  uploadTranscript() {

  }

}
