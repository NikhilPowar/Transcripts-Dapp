import { Injectable } from '@angular/core';
import { BlockchainService } from './blockchain.service';
import { IdContractService } from './id-contract.service';

@Injectable({
  providedIn: 'root'
})
export class TranscriptService {

  // tslint:disable-next-line:max-line-length
  private transcriptListABI = [ { 'inputs': [], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'constructor' }, { 'constant': false, 'inputs': [ { 'name': 'account1', 'type': 'address' }, { 'name': 'account2', 'type': 'address' }, { 'name': 'transcriptAddress', 'type': 'address' } ], 'name': 'addTranscript', 'outputs': [], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function' }, { 'constant': true, 'inputs': [ { 'name': 'account', 'type': 'address' } ], 'name': 'getTranscripts', 'outputs': [ { 'name': '', 'type': 'address[]' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': false, 'inputs': [ { 'name': 'transcriptAddress', 'type': 'address' } ], 'name': 'removeTranscript', 'outputs': [], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function' } ];
  private transcriptListContractAddress = '0x98ff6234b8b3614cD35d4CE161006398641C7DAB';

  constructor(
    private blockchainService: BlockchainService,
    private idContractSservice: IdContractService
  ) { }

  async addApplication(idAddress: string, collegeAddress: string, transcriptContractAddress: string) {
    const transcriptListContract = this.blockchainService.viewContract(this.transcriptListContractAddress, this.transcriptListABI);
    // tslint:disable-next-line:max-line-length
    await this.idContractSservice.sendThroughIDContract(idAddress, this.transcriptListContractAddress, 0, transcriptListContract.methods.addTranscript(idAddress, collegeAddress, transcriptContractAddress));
    console.log(await transcriptListContract.methods.getTranscripts(idAddress).call());
    console.log(await transcriptListContract.methods.getTranscripts(collegeAddress).call());
  }

  async getTranscripts(address: string) {
    const transcriptListContract = this.blockchainService.viewContract(this.transcriptListContractAddress, this.transcriptListABI);
    const transcripts = await transcriptListContract.methods.getTranscripts(address).call();
    console.log(transcripts);
    return transcripts;
  }
}
