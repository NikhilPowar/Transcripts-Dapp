import { Injectable } from '@angular/core';
import { ConnectService } from './connect.service';
import { Web3Provider } from 'ethers/providers';

const QRCode = require('qrcode');

@Injectable({
  providedIn: 'root'
})
export class BlockchainService {
  constructor(
    private connectService: ConnectService
  ) { }

  calculateGas(data: string) {
    return 21000 + (68 * (data.length - 2) / 2);
  }

  buildTransactionUrl(address: string, data: any, gas: number): string {
    let request = 'ethereum:';
    request += address;
    request += '/';
    request += data._method.name;
    request += '?';
    if (data.arguments.length !== 0) {
      for (let i = 0; i < data.arguments.length; i++) {
        request += data._method.inputs[i].type;
        request += '=';
        request += data.arguments[i];
        request += '&';
      }
    }
    request += 'gas=';
    request += gas;
    return request;
  }

  viewContract(address: string, abi: object) {
    const web3 = this.connectService.getWeb3();
    const contract = new web3.eth.Contract(abi, address);
    console.log(contract);
    return contract;
  }

  async updateContract(address: string, txnData: any) {
    console.log(txnData);
    const rawTxn = txnData.encodeABI();
    console.log(rawTxn);
    const gas = this.calculateGas(rawTxn);
    console.log(gas);
    const url = this.buildTransactionUrl(address, txnData, gas);
    console.log(url);
    QRCode.toCanvas(url).then(qr => {
      document.getElementById('qr').appendChild(qr);
    });
  }

  async createContract() {
    const web3 = this.connectService.getWeb3();
  }
}
