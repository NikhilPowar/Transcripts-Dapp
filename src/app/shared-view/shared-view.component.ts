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
  abi = [ { 'constant': true, 'inputs': [], 'name': 'name', 'outputs': [ { 'name': '', 'type': 'bytes32' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': true, 'inputs': [], 'name': 'courseName', 'outputs': [ { 'name': '', 'type': 'bytes32' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': true, 'inputs': [], 'name': 'id', 'outputs': [ { 'name': '', 'type': 'bytes32' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': true, 'inputs': [], 'name': 'courseCompletionYear', 'outputs': [ { 'name': '', 'type': 'uint256' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': true, 'inputs': [], 'name': 'courseStartYear', 'outputs': [ { 'name': '', 'type': 'uint256' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'inputs': [ { 'name': '_owner', 'type': 'address' }, { 'name': '_provider', 'type': 'address' }, { 'name': '_name', 'type': 'bytes32' }, { 'name': '_id', 'type': 'bytes32' }, { 'name': '_courseName', 'type': 'bytes32' }, { 'name': '_startYear', 'type': 'uint256' }, { 'name': '_completionYear', 'type': 'uint256' } ], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'constructor' }, { 'anonymous': false, 'inputs': [ { 'indexed': false, 'name': 'owner', 'type': 'address' }, { 'indexed': false, 'name': 'provider', 'type': 'address' }, { 'indexed': false, 'name': 'name', 'type': 'bytes32' }, { 'indexed': false, 'name': 'id', 'type': 'bytes32' }, { 'indexed': false, 'name': 'courseName', 'type': 'bytes32' }, { 'indexed': false, 'name': 'startYear', 'type': 'uint256' }, { 'indexed': false, 'name': 'completionYear', 'type': 'uint256' } ], 'name': 'TranscriptApplicationCreated', 'type': 'event' }, { 'anonymous': false, 'inputs': [ { 'indexed': false, 'name': 'collegeAddress', 'type': 'address' }, { 'indexed': false, 'name': 'transcriptHashValue', 'type': 'bytes32' }, { 'indexed': false, 'name': 'transcriptHashFunction', 'type': 'uint8' }, { 'indexed': false, 'name': 'transcriptHashSize', 'type': 'uint8' } ], 'name': 'TranscriptHashSet', 'type': 'event' }, { 'constant': true, 'inputs': [], 'name': 'getTranscriptHashValue', 'outputs': [ { 'name': '', 'type': 'bytes32' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': true, 'inputs': [], 'name': 'getTranscriptHashFunction', 'outputs': [ { 'name': '', 'type': 'uint8' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': true, 'inputs': [], 'name': 'getTranscriptHashSize', 'outputs': [ { 'name': '', 'type': 'uint8' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': true, 'inputs': [], 'name': 'getTranscriptOwner', 'outputs': [ { 'name': '', 'type': 'address' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': false, 'inputs': [ { 'name': 'hashValue', 'type': 'bytes32' }, { 'name': 'func', 'type': 'uint8' }, { 'name': 'size', 'type': 'uint8' } ], 'name': 'setTranscriptHash', 'outputs': [ { 'name': '', 'type': 'bytes32' } ], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function' } ];

  constructor(
    private route: ActivatedRoute,
    private ipfsService: IpfsService,
    private blockchainService: BlockchainService,
    private connectService: ConnectService,
    private modalDialogService: ModalDialogService
  ) { }

  async ngOnInit() {
    const web3 = this.connectService.getWSW3();
    if (web3 == null) {
      await this.connectService.connect();
    }
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
    let hashValue = await this.transcriptContract.methods.getTranscriptHashValue().call();
    hashValue = hashValue.slice(2, hashValue.length);
    const hashFunc = (parseInt(await this.transcriptContract.methods.getTranscriptHashFunction().call(), 10)).toString(16);
    const hashSize = (parseInt(await this.transcriptContract.methods.getTranscriptHashSize().call(), 10)).toString(16);
    const hash = hashFunc + hashSize + hashValue;
    console.log(hash);
    const bytes = Buffer.from(hash, 'hex');
    return this.toBase58(bytes);
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
    if (this.transcript['hash'] !== '16HBNVc468g8XdS6Wjry9PBCk9WeSyjWpMc2igFoEk3Lb') {
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
