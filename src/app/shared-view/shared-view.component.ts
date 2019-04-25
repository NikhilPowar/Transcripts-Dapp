import { Component, OnInit } from '@angular/core';
import { IpfsService } from '../ipfs.service';
import { ActivatedRoute } from '@angular/router';
import { ConnectService } from '../connect.service';
import { BlockchainService } from '../blockchain.service';
import { ModalDialogService } from '../modal-dialog.service';
const bs58 = require('bs58');

@Component({
  selector: 'app-shared-view',
  templateUrl: './shared-view.component.html',
  styleUrls: ['./shared-view.component.css']
})
export class SharedViewComponent implements OnInit {
  transcriptAddress: string;
  transcriptContract: any;
  buffer: Buffer;
  transcript: any;
  loading: boolean;
  // tslint:disable-next-line:max-line-length
  abi = [ { 'constant': true, 'inputs': [], 'name': 'name', 'outputs': [ { 'name': '', 'type': 'string' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': true, 'inputs': [], 'name': 'courseName', 'outputs': [ { 'name': '', 'type': 'string' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': true, 'inputs': [], 'name': 'id', 'outputs': [ { 'name': '', 'type': 'string' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': true, 'inputs': [], 'name': 'courseCompletionYear', 'outputs': [ { 'name': '', 'type': 'uint256' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': true, 'inputs': [], 'name': 'courseStartYear', 'outputs': [ { 'name': '', 'type': 'uint256' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'inputs': [ { 'name': '_owner', 'type': 'address' }, { 'name': '_provider', 'type': 'address' }, { 'name': '_name', 'type': 'string' }, { 'name': '_id', 'type': 'string' }, { 'name': '_courseName', 'type': 'string' }, { 'name': '_startYear', 'type': 'uint256' }, { 'name': '_completionYear', 'type': 'uint256' } ], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'constructor' }, { 'constant': true, 'inputs': [], 'name': 'getTranscriptHash', 'outputs': [ { 'name': '', 'type': 'string' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': true, 'inputs': [], 'name': 'getTranscriptOwner', 'outputs': [ { 'name': '', 'type': 'address' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': false, 'inputs': [ { 'name': 's', 'type': 'string' } ], 'name': 'setTranscriptHash', 'outputs': [ { 'name': '', 'type': 'string' } ], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function' } ];

  constructor(
    private route: ActivatedRoute,
    private ipfsService: IpfsService,
    private blockchainService: BlockchainService,
    private connectService: ConnectService,
    private modalDialogService: ModalDialogService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.transcriptAddress = params.transcriptAddress;
      console.log(this.transcriptAddress);
      if (this.transcriptAddress !== 'None') {
        this.loading = true;
        this.getTranscriptData().then(() => {
          this.loading = false;
        });
      }
    });
  }

  fromBase58(x: string) {
    return bs58.decode(x);
  }

  toBase58(x) {
    return bs58.encode(x);
  }

  async getTranscriptHash () {
    try {
      let hashValue = await this.transcriptContract.methods.getTranscriptHashValue().call();
      hashValue = hashValue.slice(2, hashValue.length);
      const hashFunc = (parseInt(await this.transcriptContract.methods.getTranscriptHashFunction().call(), 10)).toString(16);
      const hashSize = (parseInt(await this.transcriptContract.methods.getTranscriptHashSize().call(), 10)).toString(16);
      const hash = hashFunc + hashSize + hashValue;
      console.log(hash);
      const bytes = Buffer.from(hash, 'hex');
      return this.toBase58(bytes);
    } catch {
      return '';
    } finally { }
  }

  async getTranscriptData() {
    this.transcriptContract = this.blockchainService.viewContract(this.transcriptAddress, this.abi);
    console.log(this.transcriptContract);
    const web3 = this.connectService.getWeb3();
    this.transcript = {};
    this.transcript['hash'] = await this.getTranscriptHash();
    this.transcript['owner'] = await this.transcriptContract.methods.getTranscriptOwner().call();
    this.transcript['name'] = web3.utils.toAscii(await this.transcriptContract.methods.name().call());
    this.transcript['id'] = web3.utils.toAscii(await this.transcriptContract.methods.id().call());
    this.transcript['course_name'] = web3.utils.toAscii(await this.transcriptContract.methods.courseName().call());
    this.transcript['course_start'] = await this.transcriptContract.methods.courseStartYear().call();
    this.transcript['course_end'] = await this.transcriptContract.methods.courseCompletionYear().call();
    if (this.transcript['hash'] !== '') {
      await this.downloadTranscript();
    }
  }

  async convertFileToBuffer(event) {
    const file = event.target.files[0];
    let fileDataArray;
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.onloadend = async () => {
      console.log(fileReader.result);
      fileDataArray = fileReader.result;
      const buffer = await Buffer.from(fileDataArray);
      console.log(buffer);
      this.buffer = buffer;
    };
  }

  async convertBufferToFile() {
    const file = new Blob([this.buffer], {type: 'application/pdf'});
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL);
  }

  async downloadTranscript() {
    const hash = this.transcript['hash'];
    console.log(hash);
    this.buffer = await this.ipfsService.retrieve(hash);
  }

}
