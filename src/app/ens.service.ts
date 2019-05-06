import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { BlockchainService } from './blockchain.service';
import { ConnectService } from './connect.service';

@Injectable({
  providedIn: 'root'
})
export class EnsService {
  // tslint:disable-next-line:max-line-length
  private registrarContractAbi = [ { 'constant': true, 'inputs': [{ 'name': 'node', 'type': 'bytes32' }], 'name': 'resolver', 'outputs': [{ 'name': '', 'type': 'address' }], 'payable': false, 'type': 'function' }, { 'constant': true, 'inputs': [{ 'name': 'node', 'type': 'bytes32' }], 'name': 'owner', 'outputs': [{ 'name': '', 'type': 'address' }], 'payable': false, 'type': 'function' }, { 'constant': false, 'inputs': [{ 'name': 'node', 'type': 'bytes32' }, { 'name': 'label', 'type': 'bytes32' }, { 'name': 'owner', 'type': 'address' }], 'name': 'setSubnodeOwner', 'outputs': [], 'payable': false, 'type': 'function' }, { 'constant': false, 'inputs': [{ 'name': 'node', 'type': 'bytes32' }, { 'name': 'ttl', 'type': 'uint64' }], 'name': 'setTTL', 'outputs': [], 'payable': false, 'type': 'function' }, { 'constant': true, 'inputs': [{ 'name': 'node', 'type': 'bytes32' }], 'name': 'ttl', 'outputs': [{ 'name': '', 'type': 'uint64' }], 'payable': false, 'type': 'function' }, { 'constant': false, 'inputs': [{ 'name': 'node', 'type': 'bytes32' }, { 'name': 'resolver', 'type': 'address' }], 'name': 'setResolver', 'outputs': [], 'payable': false, 'type': 'function' }, { 'constant': false, 'inputs': [{ 'name': 'node', 'type': 'bytes32' }, { 'name': 'owner', 'type': 'address' }], 'name': 'setOwner', 'outputs': [], 'payable': false, 'type': 'function' }, { 'anonymous': false, 'inputs': [{ 'indexed': true, 'name': 'node', 'type': 'bytes32' }, { 'indexed': false, 'name': 'owner', 'type': 'address' }], 'name': 'Transfer', 'type': 'event' }, { 'anonymous': false, 'inputs': [{ 'indexed': true, 'name': 'node', 'type': 'bytes32' }, { 'indexed': true, 'name': 'label', 'type': 'bytes32' }, { 'indexed': false, 'name': 'owner', 'type': 'address' }], 'name': 'NewOwner', 'type': 'event' }, { 'anonymous': false, 'inputs': [{ 'indexed': true, 'name': 'node', 'type': 'bytes32' }, { 'indexed': false, 'name': 'resolver', 'type': 'address' }], 'name': 'NewResolver', 'type': 'event' }, { 'anonymous': false, 'inputs': [{ 'indexed': true, 'name': 'node', 'type': 'bytes32' }, { 'indexed': false, 'name': 'ttl', 'type': 'uint64' }], 'name': 'NewTTL', 'type': 'event' } ];
  private registrarContract;

  constructor(
    private connectService: ConnectService,
    private blockchainService: BlockchainService
  ) { }

  async checkSubdomain(appname: string, username: string) {
    const ensAddress = this.connectService.getProvider()['network']['ensAddress'];
    this.registrarContract = this.blockchainService.viewContract(ensAddress, this.registrarContractAbi);
    console.log(this.registrarContract);
    console.log(username + '.' + appname + '.eth :' + ethers.utils.namehash(username + '.' + appname + '.eth'));
    const owner = await this.registrarContract.methods.owner(ethers.utils.namehash(username + '.' + appname + '.eth')).call();
    console.log(owner);
    if (owner === '0x0000000000000000000000000000000000000000') {
      console.log('Subdomain available');
      return true;
    } else {
      console.log('Subdomain already exists; Owner:');
      console.log(owner);
      return owner;
    }
  }

  async registerSubdomain(appname: string, username: string, address: string) {
    console.log(this.registrarContract);
    console.log(ethers.utils.namehash(appname + '.eth'));
    console.log(ethers.utils.keccak256(ethers.utils.toUtf8Bytes(username)));
    console.log(address);
    // Old subdomain creator: 0xc7d2b6a00d972534957bcb301BDbE7370E68d43e
    const subdomainCreatorAddress = '0xECd2d15bC72cd71010b38B3D14Cf4ac55a5CEdC9';
    // tslint:disable-next-line:max-line-length
    const subdomainCreatorABI = [ { 'anonymous': false, 'inputs': [ { 'indexed': false, 'name': 'appname', 'type': 'bytes32' }, { 'indexed': false, 'name': 'username', 'type': 'bytes32' }, { 'indexed': false, 'name': 'owner', 'type': 'address' }, { 'indexed': false, 'name': 'data', 'type': 'bytes' } ], 'name': 'SubdomainCreated', 'type': 'event' }, { 'constant': false, 'inputs': [ { 'name': 'appname', 'type': 'bytes32' }, { 'name': 'username', 'type': 'bytes32' }, { 'name': 'idContract', 'type': 'address' } ], 'name': 'register', 'outputs': [ { 'name': '', 'type': 'bool' } ], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function' }, { 'constant': false, 'inputs': [ { 'name': 'appname', 'type': 'bytes32' }, { 'name': 'username', 'type': 'bytes32' }, { 'name': 'userAddress', 'type': 'address' } ], 'name': 'adminRegister', 'outputs': [ { 'name': '', 'type': 'bool' } ], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function' } ];
    const subdomainCreatorContract = this.blockchainService.viewContract(subdomainCreatorAddress, subdomainCreatorABI);

    const appNameHash = ethers.utils.namehash(appname + '.eth');
    const userNameHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(username));
    console.log(appNameHash, userNameHash);
    // tslint:disable-next-line:max-line-length
    this.blockchainService.updateContract(subdomainCreatorAddress, subdomainCreatorContract.methods.register(appNameHash, userNameHash, address));
    return subdomainCreatorContract.events.SubdomainCreated({filter: {owner: address}});
  }

  async createSubdomain(appname: string, username: string, address: string) {
    if (await this.checkSubdomain(appname, username) === true) {
      return await this.registerSubdomain(appname, username, address);
    }
    return 'failure';
  }

  async getSubdomainOwner(appname: string, username: string) {
    let owner;
    owner = await this.checkSubdomain(appname, username);
    if (owner === true) {
      return false;
    }
    return owner;
  }
}
