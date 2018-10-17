import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, Validators,FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {RegisterService} from '../register.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  
  registerForm: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  username: FormControl;
  password: FormControl;
  loading = false;
  submitted = false;
  content;
  str;
  constructor(private formBuilder: FormBuilder,private regservice: RegisterService) { 
    
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
  });
  }

  copyMessage(val: string){
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  onSubmit()
  {
    this.submitted=true;
    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true;
    this.regservice.generateAccount().subscribe(
      res=>{
        this.content=res
        this.str=JSON.stringify(this.content);
        console.log(this.str);
        this.copyMessage(this.str)
        //alert("Credentials are copied to clipboard. Please save them somewhere safe!!");
       
const IPFS = require('ipfs-mini');
const ipfs = new IPFS({host: 'ipfs.infura.io', port: 5001, protocol: 'https'});
        const randomData = this.str; 
        ipfs.add(randomData, (err, hash) => {
        if (err) {
          return console.log(err);
        }
        
        console.log("HASH:", hash);
        });
      }
    );
  }
}
