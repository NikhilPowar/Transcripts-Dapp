import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { ConnectService } from './connect.service';

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  constructor(
    private connectService: ConnectService
  ) { }

  async deployContract(abi: any, bytecode: string, args: any[]) {
    const wallet = this.connectService.getWallet();
    const factory = new ethers.ContractFactory(abi, bytecode, wallet);
    const contract = await factory.deploy(...args);
    console.log(contract.address);
    console.log(contract.deployTransaction);
    await contract.deployed();
    return contract;
  }

  accessContract(contractAddress: string, abi: any) {
    const wallet = this.connectService.getWallet();
    const contract = new ethers.Contract(contractAddress, abi, wallet);
    return contract;
  }
}
