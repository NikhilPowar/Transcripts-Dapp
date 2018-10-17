import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class RegisterService {
  constructor(private http: HttpClient) { 
  }

  generateAccount()
  {
    return this.http.post("https://api.blockcypher.com/v1/eth/main/addrs?token=7b0673199d614dca9d76fdf81289515e",httpOptions)
  }
}
