import { Injectable } from '@angular/core';
import { ConnectService } from './connect.service';
import { ContractService } from './contract.service';

@Injectable({
  providedIn: 'root'
})
export class TranscriptService {

  // tslint:disable-next-line:max-line-length
  private transcriptListABI = [ { 'inputs': [], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'constructor' }, { 'constant': false, 'inputs': [ { 'name': 'account', 'type': 'address' }, { 'name': 'transcriptAddress', 'type': 'address' } ], 'name': 'addTranscript', 'outputs': [], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function' }, { 'constant': true, 'inputs': [ { 'name': 'account', 'type': 'address' } ], 'name': 'getTranscripts', 'outputs': [ { 'name': '', 'type': 'address[]' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': false, 'inputs': [ { 'name': 'transcriptAddress', 'type': 'address' } ], 'name': 'removeTranscript', 'outputs': [], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function' } ];
  private transcriptListContractAddress = '0xcDA3bdb905e26c4A3B51688a058E5a323771D35B';

  constructor(
    private connectService: ConnectService,
    private contractService: ContractService
  ) { }

  async addApplication(idAddress: string, collegeAddress: string, transcriptContractAddress: string) {
    const from = this.connectService.getAddress();
    const transcriptListContract = this.contractService.accessContract(this.transcriptListContractAddress, this.transcriptListABI);
    await transcriptListContract.methods.addTranscript(idAddress, transcriptContractAddress).send({from: from});
    await transcriptListContract.methods.addTranscript(collegeAddress, transcriptContractAddress).send({from: from});
    console.log(await transcriptListContract.methods.getTranscripts(idAddress).call());
    console.log(await transcriptListContract.methods.getTranscripts(collegeAddress).call());
  }
}
