import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
const Tx = require('ethereumjs-tx');
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
    // tslint:disable-next-line:max-line-length
    const func = this.registrarContract.methods.setSubnodeOwner(ethers.utils.namehash(appname + '.eth'), ethers.utils.keccak256(ethers.utils.toUtf8Bytes(username)), address);
    const data = func.encodeABI();
    const subdomainCreatorAddress = '0x62e956E4fD6221c6455Ed415A214a3b8bbc90da1';
    // tslint:disable-next-line:max-line-length
    const subdomainCreatorABI = [ { 'constant': false, 'inputs': [ { 'name': 'data', 'type': 'bytes' } ], 'name': 'register', 'outputs': [ { 'name': '', 'type': 'bool' } ], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function' }, { 'constant': false, 'inputs': [ { 'name': 'data', 'type': 'bytes' } ], 'name': 'adminRegister', 'outputs': [ { 'name': '', 'type': 'bool' } ], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function' } ];
    const subdomainCreatorContract = this.blockchainService.viewContract(subdomainCreatorAddress, subdomainCreatorABI);
    this.blockchainService.updateContract(subdomainCreatorAddress, subdomainCreatorContract.methods.register(data));
    console.log('Transaction done.');
  }

  async createSubdomain(appname: string, username: string, address: string) {
    if (await this.checkSubdomain(appname, username) === true) {
      await this.registerSubdomain(appname, username, address);
      return true;
    }
    return false;
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
