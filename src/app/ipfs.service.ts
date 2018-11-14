import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IpfsService {

  constructor() { }

  store(data: Object) {
    // Function to store data using IPFS
  }

  retrieve(hash: string) {
    // Function to retrieve stored object using hash
  }
}
