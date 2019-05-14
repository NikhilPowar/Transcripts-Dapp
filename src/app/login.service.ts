import { Injectable } from '@angular/core';
import { EnsService } from './ens.service';
import { ConnectService } from './connect.service';
import { BlockchainService } from './blockchain.service';

// tslint:disable-next-line:max-line-length
const idContractAbi = [ { 'inputs': [], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'constructor' }, { 'anonymous': false, 'inputs': [ { 'indexed': true, 'name': 'key', 'type': 'bytes32' }, { 'indexed': true, 'name': 'purpose', 'type': 'uint256' }, { 'indexed': true, 'name': 'keyType', 'type': 'uint256' } ], 'name': 'KeyAdded', 'type': 'event' }, { 'anonymous': false, 'inputs': [ { 'indexed': true, 'name': 'key', 'type': 'bytes32' }, { 'indexed': true, 'name': 'purpose', 'type': 'uint256' }, { 'indexed': true, 'name': 'keyType', 'type': 'uint256' } ], 'name': 'KeyRemoved', 'type': 'event' }, { 'anonymous': false, 'inputs': [ { 'indexed': true, 'name': 'executionId', 'type': 'uint256' }, { 'indexed': true, 'name': 'to', 'type': 'address' }, { 'indexed': true, 'name': 'value', 'type': 'uint256' }, { 'indexed': false, 'name': 'data', 'type': 'bytes' } ], 'name': 'ExecutionRequested', 'type': 'event' }, { 'anonymous': false, 'inputs': [ { 'indexed': true, 'name': 'executionId', 'type': 'uint256' }, { 'indexed': true, 'name': 'to', 'type': 'address' }, { 'indexed': true, 'name': 'value', 'type': 'uint256' }, { 'indexed': false, 'name': 'data', 'type': 'bytes' } ], 'name': 'Executed', 'type': 'event' }, { 'anonymous': false, 'inputs': [ { 'indexed': true, 'name': 'executionId', 'type': 'uint256' }, { 'indexed': false, 'name': 'approved', 'type': 'bool' } ], 'name': 'Approved', 'type': 'event' }, { 'constant': true, 'inputs': [ { 'name': '_key', 'type': 'bytes32' } ], 'name': 'getKey', 'outputs': [ { 'name': 'purposes', 'type': 'uint256[]' }, { 'name': 'keyType', 'type': 'uint256' }, { 'name': 'key', 'type': 'bytes32' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': true, 'inputs': [ { 'name': '_key', 'type': 'bytes32' } ], 'name': 'getKeyPurposes', 'outputs': [ { 'name': 'purposes', 'type': 'uint256[]' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': true, 'inputs': [ { 'name': '_purpose', 'type': 'uint256' } ], 'name': 'getKeysByPurpose', 'outputs': [ { 'name': '_keys', 'type': 'bytes32[]' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': false, 'inputs': [ { 'name': '_key', 'type': 'bytes32' }, { 'name': '_purpose', 'type': 'uint256' }, { 'name': '_type', 'type': 'uint256' } ], 'name': 'addKey', 'outputs': [ { 'name': 'success', 'type': 'bool' } ], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function' }, { 'constant': false, 'inputs': [ { 'name': '_id', 'type': 'uint256' }, { 'name': '_approve', 'type': 'bool' } ], 'name': 'approve', 'outputs': [ { 'name': 'success', 'type': 'bool' } ], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function' }, { 'constant': false, 'inputs': [ { 'name': '_to', 'type': 'address' }, { 'name': '_value', 'type': 'uint256' }, { 'name': '_data', 'type': 'bytes' } ], 'name': 'execute', 'outputs': [ { 'name': 'executionId', 'type': 'uint256' } ], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function' }, { 'constant': false, 'inputs': [ { 'name': '_key', 'type': 'bytes32' }, { 'name': '_purpose', 'type': 'uint256' } ], 'name': 'removeKey', 'outputs': [ { 'name': 'success', 'type': 'bool' } ], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function' }, { 'constant': true, 'inputs': [ { 'name': '_key', 'type': 'bytes32' }, { 'name': '_purpose', 'type': 'uint256' } ], 'name': 'keyHasPurpose', 'outputs': [ { 'name': 'exists', 'type': 'bool' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' } ];
@Injectable()
export class LoginService {
  idContractAddress;
  constructor(
    private ensService: EnsService,
    private connectService: ConnectService,
    private blockchainService: BlockchainService
  ) { }

  async registerKey(address: string) {
    const idContract = this.blockchainService.viewContract(address, idContractAbi);
    const key = this.connectService.getPublicKey32Bytes();
    await this.blockchainService.updateContract(address, idContract.methods.addKey(key, 4, 1));
    return idContract.events.KeyAdded({filter: {key: key}});
  }

  async login(appname: string, username: string): Promise<any> {
    console.log('In login service.');
    const idContractAddress = await this.ensService.getSubdomainOwner(appname, username);
    console.log('ID Contract Address: ', idContractAddress);
    if (idContractAddress === false) {
      // Domain doesn't exist
      console.log('Domain doesn\'t exist');
      return 'non-existent domain';
    }
    // Domain exists. Connect to domain
    this.idContractAddress = idContractAddress
    return await this.registerKey(idContractAddress);
  }

  async loginSpecial(nonce: number) {
    const verifierContractAddress = '0x060522f49d078436c7d427a35420869ba469129b';
    // tslint:disable-next-line:max-line-length
    const verifierContractAbi = [ { 'anonymous': false, 'inputs': [ { 'indexed': false, 'name': 'sender', 'type': 'address' }, { 'indexed': false, 'name': 'nonce', 'type': 'uint256' } ], 'name': 'SignedMessage', 'type': 'event' }, { 'constant': false, 'inputs': [ { 'name': 'nonce', 'type': 'uint256' } ], 'name': 'signMessage', 'outputs': [], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function' } ];
    const verifierContract = this.blockchainService.viewContract(verifierContractAddress, verifierContractAbi);
    this.blockchainService.updateContract(verifierContractAddress, verifierContract.methods.signMessage(nonce));
    return verifierContract.events.SignedMessage({filter: {nonce: nonce}});
  }
  
  setIDContractAddress() {
    this.connectService.setIDContractAddress(this.idContractAddress);
  }
}
