import { Injectable } from '@angular/core';
const ipfs = require('ipfs-http-client');

@Injectable({
  providedIn: 'root'
})
export class IpfsService {
  private ipfs;
  constructor() {
    this.ipfs = new ipfs({host: 'ipfs.infura.io', port: 5001, protocol: 'https'});
  }

  async store(data) {
    // Function to store data using IPFS
    const hash = await this.ipfs.add(data);
    console.log('IPFS Storage hash = ');
    console.log(hash);
    console.log(hash[0].hash);
    return hash[0].hash;
  }

  async retrieve(hash: string) {
    // Function to retrieve stored object using hash
    const data = await this.ipfs.cat(hash);
    console.log(data);
    return data;
  }
}
