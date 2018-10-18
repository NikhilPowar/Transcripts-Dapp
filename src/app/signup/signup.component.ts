import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, Validators,FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {RegisterService} from '../register.service';
import { Subscriber } from '../../../node_modules/rxjs';
declare var g;
//declare var f;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})


//static hash:null; tr;


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
 hash;
  static f;
  getter(){ return SignupComponent.f; }
  setter(val) { SignupComponent.f = val; }

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


  add_to_ipfs(data,h)
  {
    const IPFS = require('ipfs-mini');
    const ipfs = new IPFS({host: 'ipfs.infura.io', port: 5001, protocol: 'https'});
    //get hash
    ipfs.add(data, function(err, hash){
      if (err) {
        return console.log(err);
      }
      else{
      console.log("HASH returned: ", hash);
      //this.hash=hash;
      ipfs.cat(hash, (err, data) => {
        if (err) {
          return console.log(err);
        }
        
        console.log("DATA:", data);
        });
      //this.setter(hash);
      //console.log("this.hash: ", g);
      }
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
        
        this.setter(JSON.stringify(res));
        console.log("Data: ",this.getter());
        var x;
        this.add_to_ipfs(this.getter(),x);


        //this.copyMessage(this.str)
        //alert("Credentials are copied to clipboard. Please save them somewhere safe!!");        
      }
    );
       
       // const IPFS = require('ipfs-mini');
        //const ipfs = new IPFS({host: 'ipfs.infura.io', port: 5001, protocol: 'https'});
        //const randomData = this.getter(); 

      //send data to ipfs
      /*ipfs.add(randomData, function(err, hash){
        if (err) {
          return console.log(err);
        }
        else{
        console.log("HASH returned: ", hash);
        //this.hash=hash;
        g=hash;
        //this.setter(hash);
        //console.log("this.hash: ", g);
        }
       });

       //console.log("this.hash: ", g);
          //console.log(this.hash);
        //get data from ipfs
          ipfs.cat(g, (err, data) => {
          if (err) {
            return console.log(err);
          }
          
          console.log("DATA:", data);
          });*/
  }
}
