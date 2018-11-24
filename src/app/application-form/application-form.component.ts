import { Component } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ContractService } from '../contract.service';
import { ConnectService } from '../connect.service';
import { TranscriptService } from '../transcript.service';

export class ApplicationErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

// tslint:disable-next-line:max-line-length
const transcriptApplicationABI = [ { 'inputs': [ { 'name': 'id', 'type': 'address' }, { 'name': 'provAddress', 'type': 'address' } ], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'constructor' }, { 'constant': true, 'inputs': [], 'name': 'getTranscriptHash', 'outputs': [ { 'name': '', 'type': 'string' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': true, 'inputs': [], 'name': 'getTranscriptOwner', 'outputs': [ { 'name': '', 'type': 'address' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': false, 'inputs': [ { 'name': 's', 'type': 'string' } ], 'name': 'setTranscriptHash', 'outputs': [ { 'name': '', 'type': 'string' } ], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function' } ];
// tslint:disable-next-line:max-line-length
const transcriptApplicationBytecode = '0x608060405234801561001057600080fd5b5060405160408061067183398101806040528101908080519060200190929190805190602001909291905050506040805190810160405280600781526020017f4e6f74207365740000000000000000000000000000000000000000000000000081525060019080519060200190610088929190610111565b50816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050506101b6565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061015257805160ff1916838001178555610180565b82800160010185558215610180579182015b8281111561017f578251825591602001919060010190610164565b5b50905061018d9190610191565b5090565b6101b391905b808211156101af576000816000905550600101610197565b5090565b90565b6104ac806101c56000396000f300608060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063301252361461005c5780633273e0fb1461013e578063a124fc23146101ce575b600080fd5b34801561006857600080fd5b506100c3600480360381019080803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509192919290505050610225565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156101035780820151818401526020810190506100e8565b50505050905090810190601f1680156101305780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561014a57600080fd5b50610153610310565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610193578082015181840152602081019050610178565b50505050905090810190601f1680156101c05780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b3480156101da57600080fd5b506101e36103b2565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6060600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156102bb576040805190810160405280600581526020017f4572726f72000000000000000000000000000000000000000000000000000000815250905061030b565b81600190805190602001906102d19291906103db565b506040805190810160405280600781526020017f537563636573730000000000000000000000000000000000000000000000000081525090505b919050565b606060018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156103a85780601f1061037d576101008083540402835291602001916103a8565b820191906000526020600020905b81548152906001019060200180831161038b57829003601f168201915b5050505050905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061041c57805160ff191683800117855561044a565b8280016001018555821561044a579182015b8281111561044957825182559160200191906001019061042e565b5b509050610457919061045b565b5090565b61047d91905b80821115610479576000816000905550600101610461565b5090565b905600a165627a7a723058201b4e17e8993c2a7f5c3140100acc4f4cad354fb54416e92906a836fed4e60a8c0029';
const collegeAddress = '0xE92fcbfb38Cc04E31cbB859b3a46702C8d3Dd7E8';
@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.css']
})
export class ApplicationFormComponent {
  private id: string;
  private college: string;

  private options: string[] = ['VJTI', 'SPIT', 'DJ', 'Thakur'];

  matcher = new ApplicationErrorStateMatcher();

  constructor(
    private connectService: ConnectService,
    private contractService: ContractService,
    private transcriptService: TranscriptService
  ) { }

  async submitApplication() {
    const idContractAddress = this.connectService.getIDContractAddress();
    // tslint:disable-next-line:max-line-length
    const transcriptContractAddress = await this.contractService.deployContract(transcriptApplicationABI, transcriptApplicationBytecode, [idContractAddress, collegeAddress]);
    console.log('Application submitted!');
    console.log('Transcript Contract Address:', transcriptContractAddress);
    const transcriptContract = this.contractService.accessContract(transcriptContractAddress, transcriptApplicationABI);
    console.log(await transcriptContract.methods.getTranscriptOwner().call());
    console.log(await transcriptContract.methods.getTranscriptHash().call());
    await this.transcriptService.addApplication(idContractAddress, collegeAddress, transcriptContractAddress);
  }
}
