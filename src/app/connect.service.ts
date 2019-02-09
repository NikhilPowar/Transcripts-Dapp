import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { ethers } from 'ethers';
const Web3 = require('web3');

@Injectable({
  providedIn: 'root'
})
export class ConnectService {
  private idContractAddress;
  private provider;
  private web3;
  private address;
  private wsw3;
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
  ) { }

  async generateAccount() {
    this.http.post(this.blockcypherURL, this.blockcypherData, this.httpOptions).subscribe(
      obj => {
        this.account = {
          'privateKey': obj['private'],
          'publicKey' : obj['public'],
          'address': obj['address']
        };
        console.log(this.account);
        this.address = this.account.address;
        console.log(this.address);
      },
      err => console.log(err)
    );
  }

  async connect() {
    // Perform login operations
    this.web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/14badb95635442999d7a5c2bec8aa00f'));
    if (!this.web3) {
      if (window['ethereum']) {
        this.web3 = new Web3(window['ethereum']);
        await window['ethereum'].enable();
      } else if (window['web3']) {
        this.web3 = new Web3(window['web3']);
      } else {
        console.log('Web3 not found. Stopping...');
      }
    }
    console.log(this.web3);
    this.provider = await new ethers.providers.Web3Provider(this.web3.currentProvider);
    console.log(this.provider);
    this.wsw3 = new Web3('wss://ropsten.infura.io/ws');
    console.log(this.wsw3);
    this.generateAccount();
  }

  public getProvider() {
    return this.provider;
  }

  public getWeb3() {
    return this.web3;
  }

  public getWSW3() {
    return this.wsw3;
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
}
