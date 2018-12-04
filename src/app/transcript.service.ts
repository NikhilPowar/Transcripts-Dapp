import { Injectable } from '@angular/core';
import { ConnectService } from './connect.service';
import { ContractService } from './contract.service';

@Injectable({
  providedIn: 'root'
})
export class TranscriptService {

  // tslint:disable-next-line:max-line-length
  private transcriptListABI = [ { 'inputs': [], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'constructor' }, { 'constant': false, 'inputs': [ { 'name': 'account', 'type': 'address' }, { 'name': 'transcriptAddress', 'type': 'address' } ], 'name': 'addTranscript', 'outputs': [], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function' }, { 'constant': true, 'inputs': [ { 'name': 'account', 'type': 'address' } ], 'name': 'getTranscripts', 'outputs': [ { 'name': '', 'type': 'address[]' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': false, 'inputs': [ { 'name': 'transcriptAddress', 'type': 'address' } ], 'name': 'removeTranscript', 'outputs': [], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function' } ];
  private transcriptListContractAddress = '0xB8269b1C96f8d9A662C5566b7C8095a61CC6Ae9c';

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

  async getTranscripts(address: string) {
    const transcriptListContract = this.contractService.accessContract(this.transcriptListContractAddress, this.transcriptListABI);
    const transcripts = await transcriptListContract.methods.getTranscripts(address).call();
    console.log(transcripts);
    return transcripts;
  }
}
