import { Component, OnInit } from '@angular/core';
import { EntityListService } from '../entity-list.service';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ModalDialogService } from '../modal-dialog.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  private providers: Array<any>;

  private providerForm: FormGroup;
  private collegeName = new FormControl('', [Validators.required]);
  private collegeAddress = new FormControl('', [Validators.required, Validators.pattern('^0x[a-fA-F0-9]{40}')]);

  private adminForm: FormGroup;
  private adminAddress = new FormControl('', [Validators.required, Validators.pattern('^0x[a-fA-F0-9]{40}')]);

  constructor(
    private formBuilder: FormBuilder,
    private entityListService: EntityListService,
    private modalDialogService: ModalDialogService
  ) {
    this.providerForm = this.formBuilder.group({
      'name': this.collegeName,
      'address': this.collegeAddress
    });

    this.adminForm = formBuilder.group({
      'address': this.adminAddress
    });
  }

  ngOnInit() {
    this.getProviderList();
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  getErrorMessage(attribute: FormControl) {
    return attribute.hasError('required') ? 'This field is required' :
        attribute.hasError('pattern') ? 'Incorrect address format' : '';
  }

  async getProviderList() {
    this.providers = await this.entityListService.getProvidersList();
    console.log(this.providers);
  }

  async addProvider(name: string, address: string) {
    let success = false;
    this.modalDialogService.openDialog('Add Institute', 'Scan the QR code with your admin wallet.');
    await this.entityListService.addProvider(name, address).then(event => {
      event.on('data', response => {
        this.modalDialogService.closeDialog();
        console.log(response);
        success = true;
        this.getProviderList();
      });
    });
    this.delay(300000).then(() => {
      if (!success) {
        this.modalDialogService.closeDialog();
        alert('The addition attempt timed out.');
      }
    });
  }

  submitProviderForm() {
    if (this.providerForm.invalid) {
      return;
    }
    this.addProvider(this.collegeName.value, this.collegeAddress.value);
  }

  async addAdmin(address: string) {
    let success = false;
    this.modalDialogService.openDialog('Add Admin', 'Scan the QR code with your admin wallet.');
    await this.entityListService.addAdmin(address).then(event => {
      event.on('data', response => {
        this.modalDialogService.closeDialog();
        console.log(response);
        success = true;
      });
    });
    this.delay(300000).then(() => {
      if (!success) {
        this.modalDialogService.closeDialog();
        alert('The login attempt timed out.');
      }
    });
  }

  submitAdminForm() {
    if (this.adminForm.invalid) {
      return;
    }
    this.addAdmin(this.adminAddress.value);
  }

  async removeProvider(address: string) {
    let success = false;
    this.modalDialogService.openDialog('Remove Institute', 'Scan the QR code with your admin wallet.');
    this.entityListService.removeProvider(address).then(event => {
      event.on('data', response => {
        this.modalDialogService.closeDialog();
        console.log(response);
        success = true;
        this.getProviderList();
      });
    });
    this.delay(300000).then(() => {
      if (!success) {
        this.modalDialogService.closeDialog();
        alert('The removal attempt timed out.');
      }
    });
  }

}
