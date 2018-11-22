import { Injectable } from '@angular/core';
import { ConnectService } from './connect.service';
const Web3 = require('web3');

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(
    private connectService: ConnectService
  ) { }

  dummyTransaction() {
    const web3 = this.connectService.getWeb3();
    web3.eth.sendTransaction();
  }
}
