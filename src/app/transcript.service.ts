import { Injectable } from '@angular/core';
import { BlockchainService } from './blockchain.service';

@Injectable({
  providedIn: 'root'
})
export class TranscriptService {

  // tslint:disable-next-line:max-line-length
  private transcriptListABI = [ { 'inputs': [], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'constructor' }, { 'anonymous': false, 'inputs': [ { 'indexed': false, 'name': 'student', 'type': 'address' }, { 'indexed': false, 'name': 'college', 'type': 'address' }, { 'indexed': false, 'name': 'transcriptAddress', 'type': 'address' } ], 'name': 'TranscriptAdded', 'type': 'event' }, { 'anonymous': false, 'inputs': [ { 'indexed': false, 'name': 'userAddress', 'type': 'address' }, { 'indexed': false, 'name': 'transcriptAddress', 'type': 'address' } ], 'name': 'TranscriptRemoved', 'type': 'event' }, { 'constant': false, 'inputs': [ { 'name': 'student', 'type': 'address' }, { 'name': 'college', 'type': 'address' }, { 'name': 'transcriptAddress', 'type': 'address' } ], 'name': 'addTranscript', 'outputs': [], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function' }, { 'constant': true, 'inputs': [ { 'name': 'account', 'type': 'address' } ], 'name': 'getTranscripts', 'outputs': [ { 'name': '', 'type': 'address[]' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': false, 'inputs': [ { 'name': 'senderAddress', 'type': 'address' }, { 'name': 'transcriptAddress', 'type': 'address' } ], 'name': 'removeTranscript', 'outputs': [], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function' } ];
  private transcriptListContractAddress = '0x1c5eec059c9f081b2f22bff4700ab8362049ad53';

  constructor(
    private blockchainService: BlockchainService
  ) { }

  async addApplication(idAddress: string, collegeAddress: string, transcriptContractAddress: string) {
    const transcriptListContract = this.blockchainService.viewContract(this.transcriptListContractAddress, this.transcriptListABI);
    this.blockchainService.updateContract(this.transcriptListContractAddress,
        transcriptListContract.methods.addTranscript(idAddress, collegeAddress, transcriptContractAddress));
    return transcriptListContract.events.TranscriptAdded();
  }

  async getTranscripts(address: string) {
    console.log('Fetching transcripts for ' + address);
    const transcriptListContract = this.blockchainService.viewContract(this.transcriptListContractAddress, this.transcriptListABI);
    const transcripts = await transcriptListContract.methods.getTranscripts(address).call();
    console.log(transcripts);
    return transcripts;
  }

  async createApplication(idContractAddress, collegeAddress, name, id, course, startYear, completionYear) {
    const contractFactory =
      await this.blockchainService.createContract('transcriptApplication',
        [idContractAddress, collegeAddress, name, id, course, startYear, completionYear]);
    return contractFactory.events.TranscriptApplicationContractCreated();
  }
}
