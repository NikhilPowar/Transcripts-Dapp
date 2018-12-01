import { Injectable } from '@angular/core';
import { EnsService } from './ens.service';
import { ContractService } from './contract.service';
import { ConnectService } from './connect.service';

// tslint:disable-next-line:max-line-length
const idContractAbi = [ { 'inputs': [], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'constructor' }, { 'anonymous': false, 'inputs': [ { 'indexed': true, 'name': 'key', 'type': 'bytes32' }, { 'indexed': true, 'name': 'purpose', 'type': 'uint256' }, { 'indexed': true, 'name': 'keyType', 'type': 'uint256' } ], 'name': 'KeyAdded', 'type': 'event' }, { 'anonymous': false, 'inputs': [ { 'indexed': true, 'name': 'key', 'type': 'bytes32' }, { 'indexed': true, 'name': 'purpose', 'type': 'uint256' }, { 'indexed': true, 'name': 'keyType', 'type': 'uint256' } ], 'name': 'KeyRemoved', 'type': 'event' }, { 'anonymous': false, 'inputs': [ { 'indexed': true, 'name': 'executionId', 'type': 'uint256' }, { 'indexed': true, 'name': 'to', 'type': 'address' }, { 'indexed': true, 'name': 'value', 'type': 'uint256' }, { 'indexed': false, 'name': 'data', 'type': 'bytes' } ], 'name': 'ExecutionRequested', 'type': 'event' }, { 'anonymous': false, 'inputs': [ { 'indexed': true, 'name': 'executionId', 'type': 'uint256' }, { 'indexed': true, 'name': 'to', 'type': 'address' }, { 'indexed': true, 'name': 'value', 'type': 'uint256' }, { 'indexed': false, 'name': 'data', 'type': 'bytes' } ], 'name': 'Executed', 'type': 'event' }, { 'anonymous': false, 'inputs': [ { 'indexed': true, 'name': 'executionId', 'type': 'uint256' }, { 'indexed': false, 'name': 'approved', 'type': 'bool' } ], 'name': 'Approved', 'type': 'event' }, { 'constant': true, 'inputs': [ { 'name': '_key', 'type': 'bytes32' } ], 'name': 'getKey', 'outputs': [ { 'name': 'purposes', 'type': 'uint256[]' }, { 'name': 'keyType', 'type': 'uint256' }, { 'name': 'key', 'type': 'bytes32' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': true, 'inputs': [ { 'name': '_key', 'type': 'bytes32' } ], 'name': 'getKeyPurposes', 'outputs': [ { 'name': 'purposes', 'type': 'uint256[]' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': true, 'inputs': [ { 'name': '_purpose', 'type': 'uint256' } ], 'name': 'getKeysByPurpose', 'outputs': [ { 'name': '_keys', 'type': 'bytes32[]' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': false, 'inputs': [ { 'name': '_key', 'type': 'bytes32' }, { 'name': '_purpose', 'type': 'uint256' }, { 'name': '_type', 'type': 'uint256' } ], 'name': 'addKey', 'outputs': [ { 'name': 'success', 'type': 'bool' } ], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function' }, { 'constant': false, 'inputs': [ { 'name': '_id', 'type': 'uint256' }, { 'name': '_approve', 'type': 'bool' } ], 'name': 'approve', 'outputs': [ { 'name': 'success', 'type': 'bool' } ], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function' }, { 'constant': false, 'inputs': [ { 'name': '_to', 'type': 'address' }, { 'name': '_value', 'type': 'uint256' }, { 'name': '_data', 'type': 'bytes' } ], 'name': 'execute', 'outputs': [ { 'name': 'executionId', 'type': 'uint256' } ], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function' }, { 'constant': false, 'inputs': [ { 'name': '_key', 'type': 'bytes32' }, { 'name': '_purpose', 'type': 'uint256' } ], 'name': 'removeKey', 'outputs': [ { 'name': 'success', 'type': 'bool' } ], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function' }, { 'constant': true, 'inputs': [ { 'name': '_key', 'type': 'bytes32' }, { 'name': '_purpose', 'type': 'uint256' } ], 'name': 'keyHasPurpose', 'outputs': [ { 'name': 'exists', 'type': 'bool' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' } ];
const entityListContractAddress = '0xC64A246D9a6d9f63B84F3bb86F47D4382968e7A9';
// tslint:disable-next-line:max-line-length
const entityListContractAbi = [ { 'constant': true, 'inputs': [ { 'name': '', 'type': 'uint256' } ], 'name': 'admins', 'outputs': [ { 'name': '', 'type': 'address' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': true, 'inputs': [ { 'name': '', 'type': 'uint256' } ], 'name': 'providingAuthorities', 'outputs': [ { 'name': 'name', 'type': 'string' }, { 'name': 'addr', 'type': 'address' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'inputs': [], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'constructor' }, { 'constant': false, 'inputs': [ { 'name': 'addr', 'type': 'address' } ], 'name': 'addAdmin', 'outputs': [ { 'name': '', 'type': 'string' } ], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function' }, { 'constant': false, 'inputs': [ { 'name': 'name', 'type': 'string' }, { 'name': 'addr', 'type': 'address' } ], 'name': 'addProvidingAuthority', 'outputs': [ { 'name': '', 'type': 'string' } ], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function' }, { 'constant': false, 'inputs': [ { 'name': 'addr', 'type': 'address' } ], 'name': 'removeProvidingAuthority', 'outputs': [ { 'name': '', 'type': 'string' } ], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function' }, { 'constant': true, 'inputs': [], 'name': 'getProvidingAuthoritiesLength', 'outputs': [ { 'name': '', 'type': 'uint256' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' } ];

@Injectable()
export class LoginService {
  constructor(
    private ensService: EnsService,
    private contractService: ContractService,
    private connectService: ConnectService
  ) { }

  async registerKey(address: string) {
    const idContract = this.contractService.accessContract(address, idContractAbi);
    const key = this.connectService.getPublicKey32Bytes();
    const from = this.connectService.getAddress();
    const tx = await idContract.methods.addKey(key, 4, 1).send({from: from});
    console.log(tx);
    console.log('Transaction done');
    idContract.methods.getKeysByPurpose(4).call().then(succ => console.log(succ), err => console.log(err));
    idContract.methods.getKeysByPurpose(1).call().then(succ => console.log(succ), err => console.log(err));
  }

  async checkEntityList() {
    const entityListContract = this.contractService.accessContract(entityListContractAddress, entityListContractAbi);
    console.log(entityListContract);
    // tslint:disable-next-line:max-line-length
    console.log(await entityListContract.methods.providingAuthorities(0).call());
  }

  async login(appname: string, username: string): Promise<boolean> {
    console.log('In login service.');
    const idContractAddress = await this.ensService.getSubdomainOwner(appname, username);
    console.log('ID Contract Address: ', idContractAddress);
    if (idContractAddress === false) {
      // Domain doesn't exist
      console.log('Domain doesn\'t exist');
      return false;
    }
    // Domain exists. Connect to domain
    this.connectService.setIDContractAddress(idContractAddress);
    await this.checkEntityList();
    await this.registerKey(idContractAddress);
    return true;
  }
}
