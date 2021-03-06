import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { ethers } from 'ethers';
import { StringifyOptions } from 'querystring';
const Web3 = require('web3');

@Injectable({
  providedIn: 'root'
})
export class ConnectService {
  private idContractAddress;
  private provider;
  private web3;
  private walletType;
  private address;
  private role;
  private blockcypherURL = 'https://api.blockcypher.com/v1/eth/main/addrs';
  private blockcypherData = {
    'token': '7b0673199d614dca9d76fdf81289515e'
  };
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  private account: {
    privateKey: string,
    publicKey: string,
    address: string
  };

  constructor(
    private http: HttpClient
  ) {
    this.idContractAddress = null;
    this.web3 = null;
    this.walletType = null;
  }

  async generateAccount() {
    this.http.post(this.blockcypherURL, this.blockcypherData, this.httpOptions).subscribe(
      obj => {
        this.account = {
          'privateKey': obj['private'],
          'publicKey' : obj['public'],
          'address': obj['address']
        };
        console.log(this.account);
      },
      err => console.log(err)
    );
  }

  async connect(walletType: string) {
    // Perform login operations
    if (walletType === 'MOBILE_WALLET') {
      this.web3 = new Web3('wss://ropsten.infura.io/ws');
      if (!this.web3) {
        console.log('Could not connect to infura. Check internet connectivity');
      }
    } else if (walletType === 'METAMASK') {
      if (window['ethereum']) {
        this.web3 = new Web3(window['ethereum']);
        await window['ethereum'].enable();
      } else if (window['web3']) {
        this.web3 = new Web3(window['web3']);
      } else {
        console.log('Web3 not found. Stopping...');
      }
      this.address = (await this.web3.eth.getAccounts())[0];
      console.log(this.address);
    } else {
      console.log('Illegal parameter to connect function');
      return;
    }
    this.walletType = walletType;
    console.log(this.web3);
    this.provider = await new ethers.providers.Web3Provider(this.web3.currentProvider);
    console.log(this.provider);
    this.generateAccount();
  }

  async disconnect() {
    this.provider = null;
    this.web3 = null;
    this.address = null;
    this.account = null;
    this.idContractAddress = null;
    this.role = null;
  }

  public getProvider() {
    return this.provider;
  }

  public getWeb3() {
    return this.web3;
  }

  public getAddress() {
    return this.address;
  }

  public getAccount() {
    return this.account;
  }

  public getPublicKey32Bytes() {
    return ethers.utils.keccak256('0x' + this.account['publicKey']);
  }

  public setIDContractAddress(address: string) {
    this.idContractAddress = address;
  }

  public getIDContractAddress() {
    return this.idContractAddress;
  }

  public setRole(role: string) {
    this.role = role;
  }

  public getRole() {
    return this.role;
  }

  public getWalletType() {
    return this.walletType;
  }
}
