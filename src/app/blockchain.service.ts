import { Injectable } from '@angular/core';
import { ConnectService } from './connect.service';

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

  getTransactionUrl(address: string, data: any, gas: number): string {
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
    const web3 = this.connectService.getWSW3();
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
    const url = this.getTransactionUrl(address, txnData, gas);
    console.log(url);
    QRCode.toCanvas(url).then(qr => {
      document.getElementById('qr').appendChild(qr);
    });
  }

  async createContract(name: string, args?: any[]): Promise<any> {
    // KeyHolderLibrary address: 0xb40ED801354B527732187a3a6b4E32e32f38ebBE
    // ContractFactory address: 0x0600719a3a76457b77ae0d7de1c1b4301afb8b0f
    const address = '0x0600719a3a76457b77ae0d7de1c1b4301afb8b0f';
    // ContractFactory ABI
    // tslint:disable-next-line:max-line-length
    const abi = [ { 'anonymous': false, 'inputs': [ { 'indexed': false, 'name': 'creator', 'type': 'address' }, { 'indexed': false, 'name': 'idContractAddress', 'type': 'address' } ], 'name': 'IdentityContractCreated', 'type': 'event' }, { 'anonymous': false, 'inputs': [ { 'indexed': false, 'name': 'creator', 'type': 'address' }, { 'indexed': false, 'name': 'owner', 'type': 'address' }, { 'indexed': false, 'name': 'provider', 'type': 'address' }, { 'indexed': false, 'name': 'name', 'type': 'bytes32' }, { 'indexed': false, 'name': 'id', 'type': 'bytes32' }, { 'indexed': false, 'name': 'courseName', 'type': 'bytes32' }, { 'indexed': false, 'name': 'startYear', 'type': 'uint256' }, { 'indexed': false, 'name': 'completionYear', 'type': 'uint256' }, { 'indexed': false, 'name': 'applicationAddress', 'type': 'address' } ], 'name': 'TranscriptApplicationContractCreated', 'type': 'event' }, { 'constant': false, 'inputs': [], 'name': 'createIdentityContract', 'outputs': [ { 'name': 'idContractAddress', 'type': 'address' } ], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function' }, { 'constant': false, 'inputs': [ { 'name': 'owner', 'type': 'address' }, { 'name': 'provider', 'type': 'address' }, { 'name': 'name', 'type': 'bytes32' }, { 'name': 'id', 'type': 'bytes32' }, { 'name': 'courseName', 'type': 'bytes32' }, { 'name': 'startYear', 'type': 'uint256' }, { 'name': 'completionYear', 'type': 'uint256' } ], 'name': 'createTranscriptApplicationContract', 'outputs': [ { 'name': 'transcriptApplicationAddress', 'type': 'address' } ], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function' } ];

    const contractFactory = this.viewContract(address, abi);

    let data: any;
    if (name === 'identity') {
      data = await contractFactory.methods.createIdentityContract();
    } else if (name === 'transcriptApplication') {
      data = await contractFactory.methods.createTranscriptApplicationContract(
        args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
    }
    console.log(data);

    const gas = this.calculateGas(data);
    console.log(gas);
    const url = this.getTransactionUrl(address, data, 1500000);
    console.log(url);
    QRCode.toCanvas(url).then(qr => {
      document.getElementById('qr').appendChild(qr);
    });
    return contractFactory;
  }
}
