import { Component } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
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
const transcriptApplicationABI = [ { 'inputs': [ { 'name': '_owner', 'type': 'address' }, { 'name': '_provider', 'type': 'address' }, { 'name': '_name', 'type': 'string' }, { 'name': '_id', 'type': 'string' }, { 'name': '_courseName', 'type': 'string' }, { 'name': '_startYear', 'type': 'uint256' }, { 'name': '_completionYear', 'type': 'uint256' } ], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'constructor' }, { 'constant': true, 'inputs': [], 'name': 'getTranscriptHash', 'outputs': [ { 'name': '', 'type': 'string' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': true, 'inputs': [], 'name': 'getTranscriptOwner', 'outputs': [ { 'name': '', 'type': 'address' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': false, 'inputs': [ { 'name': 's', 'type': 'string' } ], 'name': 'setTranscriptHash', 'outputs': [ { 'name': '', 'type': 'string' } ], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function' } ];
// tslint:disable-next-line:max-line-length
const transcriptApplicationBytecode = '0x608060405234801561001057600080fd5b5060405161083a38038061083a833981018060405260e081101561003357600080fd5b810190808051906020019092919080519060200190929190805164010000000081111561005f57600080fd5b8281019050602081018481111561007557600080fd5b815185600182028301116401000000008211171561009257600080fd5b505092919060200180516401000000008111156100ae57600080fd5b828101905060208101848111156100c457600080fd5b81518560018202830111640100000000821117156100e157600080fd5b505092919060200180516401000000008111156100fd57600080fd5b8281019050602081018481111561011357600080fd5b815185600182028301116401000000008211171561013057600080fd5b505092919060200180519060200190929190805190602001909291905050506040805190810160405280600781526020017f4e6f7420736574000000000000000000000000000000000000000000000000008152506001908051906020019061019a92919061027b565b50866000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555085600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550846003908051906020019061023292919061027b565b50836004908051906020019061024992919061027b565b50826005908051906020019061026092919061027b565b50816006819055508060078190555050505050505050610320565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106102bc57805160ff19168380011785556102ea565b828001600101855582156102ea579182015b828111156102e95782518255916020019190600101906102ce565b5b5090506102f791906102fb565b5090565b61031d91905b80821115610319576000816000905550600101610301565b5090565b90565b61050b8061032f6000396000f3fe608060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063301252361461005c5780633273e0fb1461019d578063a124fc231461022d575b600080fd5b34801561006857600080fd5b506101226004803603602081101561007f57600080fd5b810190808035906020019064010000000081111561009c57600080fd5b8201836020820111156100ae57600080fd5b803590602001918460018302840111640100000000831117156100d057600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050509192919290505050610284565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610162578082015181840152602081019050610147565b50505050905090810190601f16801561018f5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b3480156101a957600080fd5b506101b261036f565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156101f25780820151818401526020810190506101d7565b50505050905090810190601f16801561021f5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561023957600080fd5b50610242610411565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6060600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561031a576040805190810160405280600581526020017f4572726f72000000000000000000000000000000000000000000000000000000815250905061036a565b816001908051906020019061033092919061043a565b506040805190810160405280600781526020017f537563636573730000000000000000000000000000000000000000000000000081525090505b919050565b606060018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156104075780601f106103dc57610100808354040283529160200191610407565b820191906000526020600020905b8154815290600101906020018083116103ea57829003601f168201915b5050505050905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061047b57805160ff19168380011785556104a9565b828001600101855582156104a9579182015b828111156104a857825182559160200191906001019061048d565b5b5090506104b691906104ba565b5090565b6104dc91905b808211156104d85760008160009055506001016104c0565b5090565b9056fea165627a7a72305820a94cec8b2131b45ae207927b8e9ee0e629aea31e97b0e71e52570fc429add9ca0029';
// TODO: Remove hard-coded address
const collegeAddress = '0xE92fcbfb38Cc04E31cbB859b3a46702C8d3Dd7E8';
@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.css']
})
export class ApplicationFormComponent {
  private id = new FormControl('', [Validators.required]);
  private name = new FormControl('', [Validators.required]);
  private college = new FormControl('', [Validators.required]);
  private course = new FormControl('', [Validators.required]);
  private startYear = new FormControl('', [Validators.required]);
  private completionYear = new FormControl('', [Validators.required]);

  private yearRange: number[];
  private options: string[] = ['VJTI', 'SPIT', 'DJ', 'Thakur'];

  matcher = new ApplicationErrorStateMatcher();

  constructor(
    private connectService: ConnectService,
    private contractService: ContractService,
    private transcriptService: TranscriptService,
  ) {
    const currentYear = (new Date()).getFullYear();
    let i: number;
    this.yearRange = [];
    for (i = currentYear - 20; i <= currentYear + 5; i++) {
      this.yearRange.push(i);
    }
  }

  getErrorMessage(attribute: FormControl) {
    return attribute.hasError('required') ? 'You must enter a value' : '';
  }

  startYearChanged() {
    if (this.startYear.value >= this.completionYear.value) {
      this.completionYear.reset();
    }
  }

  async submitApplication() {
    const idContractAddress = this.connectService.getIDContractAddress();
    // TODO: Get address from this.college
    const transcriptContractAddress =
      await this.contractService.deployContract(transcriptApplicationABI, transcriptApplicationBytecode,
        [idContractAddress, collegeAddress, this.name, this.id, this.course,
          this.startYear, this.completionYear]);
    console.log('Application submitted!');
    console.log('Transcript Contract Address:', transcriptContractAddress);
    const transcriptContract = this.contractService.accessContract(transcriptContractAddress, transcriptApplicationABI);
    console.log(await transcriptContract.methods.getTranscriptOwner().call());
    console.log(await transcriptContract.methods.getTranscriptHash().call());
    await this.transcriptService.addApplication(idContractAddress, collegeAddress, transcriptContractAddress);
  }
}
