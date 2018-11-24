import { Injectable } from '@angular/core';
import { ConnectService } from './connect.service';
import { ContractService } from './contract.service';
import { ethers } from 'ethers';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  constructor(
    private connectService: ConnectService,
    private contractService: ContractService
  ) { }

  dummyTransaction() {
    console.log('In dummyTransaction()');
    const abi = [{ 'constant': true, 'inputs': [{ 'name': 'node', 'type': 'bytes32' }], 'name': 'resolver', 'outputs': [{ 'name': '', 'type': 'address' }], 'payable': false, 'type': 'function' }, { 'constant': true, 'inputs': [{ 'name': 'node', 'type': 'bytes32' }], 'name': 'owner', 'outputs': [{ 'name': '', 'type': 'address' }], 'payable': false, 'type': 'function' }, { 'constant': false, 'inputs': [{ 'name': 'node', 'type': 'bytes32' }, { 'name': 'label', 'type': 'bytes32' }, { 'name': 'owner', 'type': 'address' }], 'name': 'setSubnodeOwner', 'outputs': [], 'payable': false, 'type': 'function' }, { 'constant': false, 'inputs': [{ 'name': 'node', 'type': 'bytes32' }, { 'name': 'ttl', 'type': 'uint64' }], 'name': 'setTTL', 'outputs': [], 'payable': false, 'type': 'function' }, { 'constant': true, 'inputs': [{ 'name': 'node', 'type': 'bytes32' }], 'name': 'ttl', 'outputs': [{ 'name': '', 'type': 'uint64' }], 'payable': false, 'type': 'function' }, { 'constant': false, 'inputs': [{ 'name': 'node', 'type': 'bytes32' }, { 'name': 'resolver', 'type': 'address' }], 'name': 'setResolver', 'outputs': [], 'payable': false, 'type': 'function' }, { 'constant': false, 'inputs': [{ 'name': 'node', 'type': 'bytes32' }, { 'name': 'owner', 'type': 'address' }], 'name': 'setOwner', 'outputs': [], 'payable': false, 'type': 'function' }, { 'anonymous': false, 'inputs': [{ 'indexed': true, 'name': 'node', 'type': 'bytes32' }, { 'indexed': false, 'name': 'owner', 'type': 'address' }], 'name': 'Transfer', 'type': 'event' }, { 'anonymous': false, 'inputs': [{ 'indexed': true, 'name': 'node', 'type': 'bytes32' }, { 'indexed': true, 'name': 'label', 'type': 'bytes32' }, { 'indexed': false, 'name': 'owner', 'type': 'address' }], 'name': 'NewOwner', 'type': 'event' }, { 'anonymous': false, 'inputs': [{ 'indexed': true, 'name': 'node', 'type': 'bytes32' }, { 'indexed': false, 'name': 'resolver', 'type': 'address' }], 'name': 'NewResolver', 'type': 'event' }, { 'anonymous': false, 'inputs': [{ 'indexed': true, 'name': 'node', 'type': 'bytes32' }, { 'indexed': false, 'name': 'ttl', 'type': 'uint64' }], 'name': 'NewTTL', 'type': 'event' }];
    const web3 = this.connectService.getWeb3();
    const contract = new web3.eth.Contract(abi, '0x112234455c3a32fd11230c42e7bccd4a84e02010');
    console.log(contract);
    const callData = contract.methods.owner(ethers.utils.namehash('nikhil.transcripts.test')).encodeABI();
    this.sendThroughID('0x112234455c3a32fd11230c42e7bccd4a84e02010', 0, callData);
  }

  async sendThroughID(to: string, value: number, data: string) {
    console.log('Sending through ID');
    const abi = [ { 'inputs': [], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'constructor' }, { 'anonymous': false, 'inputs': [ { 'indexed': true, 'name': 'key', 'type': 'bytes32' }, { 'indexed': true, 'name': 'purpose', 'type': 'uint256' }, { 'indexed': true, 'name': 'keyType', 'type': 'uint256' } ], 'name': 'KeyAdded', 'type': 'event' }, { 'anonymous': false, 'inputs': [ { 'indexed': true, 'name': 'key', 'type': 'bytes32' }, { 'indexed': true, 'name': 'purpose', 'type': 'uint256' }, { 'indexed': true, 'name': 'keyType', 'type': 'uint256' } ], 'name': 'KeyRemoved', 'type': 'event' }, { 'anonymous': false, 'inputs': [ { 'indexed': true, 'name': 'executionId', 'type': 'uint256' }, { 'indexed': true, 'name': 'to', 'type': 'address' }, { 'indexed': true, 'name': 'value', 'type': 'uint256' }, { 'indexed': false, 'name': 'data', 'type': 'bytes' } ], 'name': 'ExecutionRequested', 'type': 'event' }, { 'anonymous': false, 'inputs': [ { 'indexed': true, 'name': 'executionId', 'type': 'uint256' }, { 'indexed': true, 'name': 'to', 'type': 'address' }, { 'indexed': true, 'name': 'value', 'type': 'uint256' }, { 'indexed': false, 'name': 'data', 'type': 'bytes' } ], 'name': 'Executed', 'type': 'event' }, { 'anonymous': false, 'inputs': [ { 'indexed': true, 'name': 'executionId', 'type': 'uint256' }, { 'indexed': false, 'name': 'approved', 'type': 'bool' } ], 'name': 'Approved', 'type': 'event' }, { 'constant': true, 'inputs': [ { 'name': '_key', 'type': 'bytes32' } ], 'name': 'getKey', 'outputs': [ { 'name': 'purposes', 'type': 'uint256[]' }, { 'name': 'keyType', 'type': 'uint256' }, { 'name': 'key', 'type': 'bytes32' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': true, 'inputs': [ { 'name': '_key', 'type': 'bytes32' } ], 'name': 'getKeyPurposes', 'outputs': [ { 'name': 'purposes', 'type': 'uint256[]' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': true, 'inputs': [ { 'name': '_purpose', 'type': 'uint256' } ], 'name': 'getKeysByPurpose', 'outputs': [ { 'name': '_keys', 'type': 'bytes32[]' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': false, 'inputs': [ { 'name': '_key', 'type': 'bytes32' }, { 'name': '_purpose', 'type': 'uint256' }, { 'name': '_type', 'type': 'uint256' } ], 'name': 'addKey', 'outputs': [ { 'name': 'success', 'type': 'bool' } ], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function' }, { 'constant': false, 'inputs': [ { 'name': '_id', 'type': 'uint256' }, { 'name': '_approve', 'type': 'bool' } ], 'name': 'approve', 'outputs': [ { 'name': 'success', 'type': 'bool' } ], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function' }, { 'constant': false, 'inputs': [ { 'name': '_to', 'type': 'address' }, { 'name': '_value', 'type': 'uint256' }, { 'name': '_data', 'type': 'bytes' } ], 'name': 'execute', 'outputs': [ { 'name': 'executionId', 'type': 'uint256' } ], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function' }, { 'constant': false, 'inputs': [ { 'name': '_key', 'type': 'bytes32' }, { 'name': '_purpose', 'type': 'uint256' } ], 'name': 'removeKey', 'outputs': [ { 'name': 'success', 'type': 'bool' } ], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function' }, { 'constant': true, 'inputs': [ { 'name': '_key', 'type': 'bytes32' }, { 'name': '_purpose', 'type': 'uint256' } ], 'name': 'keyHasPurpose', 'outputs': [ { 'name': 'exists', 'type': 'bool' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' } ];
    const idContract = this.contractService.accessContract(this.connectService.getIDContractAddress(), abi);
    console.log(idContract.events);
    idContract.events.ExecutionRequested().on('data', (event) => {
      console.log(event);
    });
    idContract.events.Approved().on('data', (event) => {
      console.log(event);
    });
    idContract.events.Executed().on('data', (event) => {
      console.log(event);
    });
    const from = this.connectService.getAddress();
    const execID = await idContract.methods.execute(to, value, data).send({from: from});
    console.log(execID);
  }
}
