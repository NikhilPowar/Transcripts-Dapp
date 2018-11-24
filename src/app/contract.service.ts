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
    const web3 = this.connectService.getWeb3();
    const from = this.connectService.getAddress();
    const contract = new web3.eth.Contract(abi);
    const data = contract.deploy({
      data: bytecode,
      arguments: args
    }).encodeABI();
    const tx = web3.eth.sendTransaction({
      from: from,
      data: data
    });
    const result = await tx;
    console.log(result);
    console.log(result.contractAddress);
    return result.contractAddress;
  }

  accessContract(contractAddress: string, abi: any) {
    const web3 = this.connectService.getWeb3();
    const contract = new web3.eth.Contract(abi, contractAddress);
    console.log(contract);
    return contract;
  }
}
