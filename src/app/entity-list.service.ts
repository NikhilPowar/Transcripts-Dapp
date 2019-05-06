import { Injectable } from '@angular/core';
import { BlockchainService } from './blockchain.service';
import { ConnectService } from './connect.service';

// Old entityListContractAddress = 0x9AD9Da14d8ff7aC38D6E5333041425c02392A16e
const entityListContractAddress = '0xb2cee596a61810e4585ab1f63b840c4207b38fa3';
// tslint:disable-next-line:max-line-length
// Old entityListContractAbi = [ { 'constant': true, 'inputs': [ { 'name': '', 'type': 'uint256' } ], 'name': 'admins', 'outputs': [ { 'name': '', 'type': 'address' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': true, 'inputs': [ { 'name': '', 'type': 'uint256' } ], 'name': 'providingAuthorities', 'outputs': [ { 'name': 'name', 'type': 'string' }, { 'name': 'addr', 'type': 'address' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'inputs': [], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'constructor' }, { 'constant': false, 'inputs': [ { 'name': 'addr', 'type': 'address' } ], 'name': 'addAdmin', 'outputs': [ { 'name': '', 'type': 'string' } ], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function' }, { 'constant': false, 'inputs': [ { 'name': 'name', 'type': 'string' }, { 'name': 'addr', 'type': 'address' } ], 'name': 'addProvidingAuthority', 'outputs': [ { 'name': '', 'type': 'string' } ], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function' }, { 'constant': false, 'inputs': [ { 'name': 'addr', 'type': 'address' } ], 'name': 'removeProvidingAuthority', 'outputs': [ { 'name': '', 'type': 'string' } ], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function' }, { 'constant': true, 'inputs': [], 'name': 'getProvidingAuthoritiesLength', 'outputs': [ { 'name': '', 'type': 'uint256' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': true, 'inputs': [], 'name': 'getAdminsLength', 'outputs': [ { 'name': '', 'type': 'uint256' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' } ];
// tslint:disable-next-line:max-line-length
const entityListContractAbi = [ { 'constant': true, 'inputs': [ { 'name': '', 'type': 'uint256' } ], 'name': 'admins', 'outputs': [ { 'name': '', 'type': 'address' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': true, 'inputs': [ { 'name': '', 'type': 'uint256' } ], 'name': 'providingAuthorities', 'outputs': [ { 'name': 'name', 'type': 'bytes32' }, { 'name': 'addr', 'type': 'address' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'inputs': [], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'constructor' }, { 'anonymous': false, 'inputs': [ { 'indexed': false, 'name': 'addr', 'type': 'address' }, { 'indexed': false, 'name': 'name', 'type': 'bytes32' }, { 'indexed': false, 'name': 'sender', 'type': 'address' } ], 'name': 'ProviderAdded', 'type': 'event' }, { 'anonymous': false, 'inputs': [ { 'indexed': false, 'name': 'addr', 'type': 'address' }, { 'indexed': false, 'name': 'sender', 'type': 'address' } ], 'name': 'ProviderRemoved', 'type': 'event' }, { 'anonymous': false, 'inputs': [ { 'indexed': false, 'name': 'addr', 'type': 'address' }, { 'indexed': false, 'name': 'sender', 'type': 'address' } ], 'name': 'AdminAdded', 'type': 'event' }, { 'anonymous': false, 'inputs': [ { 'indexed': false, 'name': 'addr', 'type': 'address' }, { 'indexed': false, 'name': 'sender', 'type': 'address' } ], 'name': 'AdminRemoved', 'type': 'event' }, { 'constant': false, 'inputs': [ { 'name': 'addr', 'type': 'address' } ], 'name': 'addAdmin', 'outputs': [ { 'name': '', 'type': 'bytes32' } ], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function' }, { 'constant': false, 'inputs': [ { 'name': 'addr', 'type': 'address' } ], 'name': 'removeAdmin', 'outputs': [ { 'name': '', 'type': 'bytes32' } ], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function' }, { 'constant': false, 'inputs': [ { 'name': 'name', 'type': 'bytes32' }, { 'name': 'addr', 'type': 'address' } ], 'name': 'addProvidingAuthority', 'outputs': [ { 'name': '', 'type': 'bytes32' } ], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function' }, { 'constant': false, 'inputs': [ { 'name': 'addr', 'type': 'address' } ], 'name': 'removeProvidingAuthority', 'outputs': [ { 'name': '', 'type': 'bytes32' } ], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function' }, { 'constant': true, 'inputs': [], 'name': 'getProvidingAuthoritiesLength', 'outputs': [ { 'name': '', 'type': 'uint256' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': true, 'inputs': [], 'name': 'getAdminsLength', 'outputs': [ { 'name': '', 'type': 'uint256' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' } ];

@Injectable({
  providedIn: 'root'
})
export class EntityListService {
  private entityListContract;

  constructor(
    private blockchainService: BlockchainService,
    private connectService: ConnectService
  ) {
    this.entityListContract = this.blockchainService.viewContract(entityListContractAddress, entityListContractAbi);
    console.log(this.entityListContract);
  }

  pad(s: string, size: number): string {
    while (s.length < size) {
      s = s + '0';
    }
    return s;
  }

  stringToBytes32(input: string): string {
    return this.pad(this.connectService.getWeb3().utils.fromAscii(input), 66);
  }

  async getAdminList() {
    console.log(this.entityListContract);
    const adminLength = await this.entityListContract.methods.getAdminsLength().call();
    const admins = [];
    for (let i = 0; i < adminLength; i++) {
      admins.push(await this.entityListContract.methods.admins(i).call());
    }
    return admins;
  }

  async getProvidersList() {
    console.log(this.entityListContract);
    const providersLength = await this.entityListContract.methods.getProvidingAuthoritiesLength().call();
    console.log(providersLength);
    let providers = [];
    for (let i = 0; i < providersLength; i++) {
      providers.push(await this.entityListContract.methods.providingAuthorities(i).call());
    }
    console.log(providers);
    const web3 = this.connectService.getWeb3();
    providers = providers.map((obj) => {
      return {
        addr: obj.addr,
        name: web3.utils.hexToUtf8(obj.name)
      };
    }).filter((obj) =>
      obj.addr !== '0x0000000000000000000000000000000000000000'
    );
    console.log(providers);
    return providers;
  }

  async addProvider(name: string, address: string) {
    console.log(this.entityListContract);
    name = this.stringToBytes32(name);
    this.blockchainService.updateContract(entityListContractAddress, this.entityListContract.methods.addProvidingAuthority(name, address));
    return this.entityListContract.events.ProviderAdded({filter: {addr: address}});
  }

  async addAdmin(address: string) {
    console.log(this.entityListContract);
    this.blockchainService.updateContract(entityListContractAddress, this.entityListContract.methods.addAdmin(address));
    return this.entityListContract.events.AdminAdded({filter: {addr: address}});
  }

  async removeProvider(address: string) {
    console.log(this.entityListContract);
    this.blockchainService.updateContract(entityListContractAddress, this.entityListContract.methods.removeProvidingAuthority(address));
    return this.entityListContract.events.ProviderRemoved({filter: {addr: address}});
  }

}
