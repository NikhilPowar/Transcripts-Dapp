import { Injectable } from '@angular/core';
import { ConnectService } from './connect.service';
import { BlockchainService } from './blockchain.service';

const entityListContractAddress = '0x9AD9Da14d8ff7aC38D6E5333041425c02392A16e';
// tslint:disable-next-line:max-line-length
const entityListContractAbi = [ { 'constant': true, 'inputs': [ { 'name': '', 'type': 'uint256' } ], 'name': 'admins', 'outputs': [ { 'name': '', 'type': 'address' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': true, 'inputs': [ { 'name': '', 'type': 'uint256' } ], 'name': 'providingAuthorities', 'outputs': [ { 'name': 'name', 'type': 'string' }, { 'name': 'addr', 'type': 'address' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'inputs': [], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'constructor' }, { 'constant': false, 'inputs': [ { 'name': 'addr', 'type': 'address' } ], 'name': 'addAdmin', 'outputs': [ { 'name': '', 'type': 'string' } ], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function' }, { 'constant': false, 'inputs': [ { 'name': 'name', 'type': 'string' }, { 'name': 'addr', 'type': 'address' } ], 'name': 'addProvidingAuthority', 'outputs': [ { 'name': '', 'type': 'string' } ], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function' }, { 'constant': false, 'inputs': [ { 'name': 'addr', 'type': 'address' } ], 'name': 'removeProvidingAuthority', 'outputs': [ { 'name': '', 'type': 'string' } ], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function' }, { 'constant': true, 'inputs': [], 'name': 'getProvidingAuthoritiesLength', 'outputs': [ { 'name': '', 'type': 'uint256' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': true, 'inputs': [], 'name': 'getAdminsLength', 'outputs': [ { 'name': '', 'type': 'uint256' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' } ];

@Injectable({
  providedIn: 'root'
})
export class EntityListService {
  private entityListContract;

  constructor(
    private connectService: ConnectService,
    private blockchainService: BlockchainService
  ) {
    this.entityListContract = this.blockchainService.viewContract(entityListContractAddress, entityListContractAbi);
    console.log(this.entityListContract);
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
    providers = providers.map((obj) => {
      return {
        addr: obj.addr,
        name: obj.name
      };
    });
    console.log(providers);
    return providers;
  }

  async addProvider(name: string, address: string) {
    console.log(this.entityListContract);
    const from = this.connectService.getAddress();
    return await this.blockchainService.updateContract(entityListContractAddress,
      this.entityListContract.methods.addProvidingAuthority(name, address));
  }

  async addAdmin(address: string) {
    console.log(this.entityListContract);
    const from = this.connectService.getAddress();
    return await this.blockchainService.updateContract(entityListContractAddress,
      this.entityListContract.methods.addAdmin(address));
  }

  async removeProvider(address: string) {
    console.log(this.entityListContract);
    const from = this.connectService.getAddress();
    return await this.blockchainService.updateContract(entityListContractAddress,
      this.entityListContract.methods.removeProvidingAuthority(address).send({from: from}));
  }

}
