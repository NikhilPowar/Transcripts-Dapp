import { Injectable } from '@angular/core';
import { ConnectService } from './connect.service';

@Injectable({
  providedIn: 'root'
})
export class BlockchainService {
  constructor(
    private connectService: ConnectService
  ) { }

  async call(address: string, abi: object) {
    const web3 = this.connectService.getWeb3();
    const contract = new web3.eth.Contract(abi, address);
    console.log(contract);
    return contract;
  }

  async transact(from: string, txData: any) {
    
  }
}
