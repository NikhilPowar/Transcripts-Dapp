import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { EnsService } from './ens.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class LoginService {

  private addressURL = 'https://api.blockcypher.com/v1/eth/main/addrs';
  private data = {
    'token': '7b0673199d614dca9d76fdf81289515e'
  };

  private account: {
    privateKey: string,
    publicKey: string,
    address: string
  };

  constructor(
    private http: HttpClient,
    private ensService: EnsService
  ) { }

  generateKey() {
    this.http.post(this.addressURL, this.data, httpOptions).subscribe(
      obj => {
        this.account['privateKey'] = obj['private'];
        this.account['publicKey'] = obj['public'];
        this.account['address'] = obj['address'];
      }
    );
  }

  login(username: string, password: string, appname: string) {
    // Perform login operations
    this.generateKey();
    this.ensService.verifySubdomain(appname, username);
    // broadcastTransaction();
    // sendTransaction();
  }
}
