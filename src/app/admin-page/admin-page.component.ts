import { Component, OnInit } from '@angular/core';
import { EntityListService } from '../entity-list.service';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  providers;

  private providerForm: FormGroup;
  private collegeName = new FormControl('', [Validators.required]);
  private collegeAddress = new FormControl('', [Validators.required, Validators.pattern('^0x[a-fA-F0-9]{40}')]);

  private adminForm: FormGroup;
  private adminAddress = new FormControl('', [Validators.required, Validators.pattern('^0x[a-fA-F0-9]{40}')]);

  constructor(
    private formBuilder: FormBuilder,
    private entityListService: EntityListService
    ) {
    this.providerForm = formBuilder.group({
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

  getErrorMessage(attribute: FormControl) {
    return attribute.hasError('required') ? 'You must enter a value' :
        attribute.hasError('pattern') ? 'Incorrect address format' : '';
  }

  async getProviderList() {
    this.providers = await this.entityListService.getProvidersList();
    console.log(this.providers);
  }

  async addProvider(name: string, address: string) {
    await this.entityListService.addProvider(name, address);
  }

  submitProviderForm() {
    if (this.providerForm.invalid) {
      return;
    }
    this.addProvider(this.collegeName.value, this.collegeAddress.value);
  }

  async addAdmin(address: string) {
    await this.entityListService.addAdmin(address);
  }

  submitAdminForm() {
    if (this.adminForm.invalid) {
      return;
    }
    this.addAdmin(this.adminAddress.value);
  }

  async removeProvider(address: string) {
    await this.entityListService.removeProvider(address);
  }

}
