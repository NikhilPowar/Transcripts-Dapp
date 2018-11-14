import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { ethers } from 'ethers';
const Web3 = require('web3');

@Injectable({
  providedIn: 'root'
})
export class ConnectService {
  private provider;
  private address;
  private wallet;
  private addressURL = 'https://api.blockcypher.com/v1/eth/main/addrs';
  private data = {
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

  generateKey() {
    this.http.post(this.addressURL, this.data, this.httpOptions).subscribe(
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

  async connect() {
    // Perform login operations
    let web3;
    if (window['ethereum']) {
      web3 = new Web3(window['ethereum']);
      await window['ethereum'].enable();
    } else if (window['web3']) {
      web3 = new Web3(window['web3']);
    } else {
      console.log('Web3 not found. Stopping...');
    }
    console.log(web3);
    this.provider = await new ethers.providers.Web3Provider(web3.currentProvider);
    console.log(this.provider);
    this.address = (await web3.eth.getAccounts())[0];
    console.log(this.address);
    this.generateKey();
    this.wallet = await new ethers.Wallet('468e048a5af776c9a7690db90694fed44fd5c599118afb7c9e1313efeafc46a9', this.provider);
    console.log(this.wallet);
  }

  public getProvider() {
    return this.provider;
  }

  public getAddress() {
    return this.address;
  }

  public getWallet() {
    return this.wallet;
  }

  public getAccount() {
    return this.account;
  }
}
