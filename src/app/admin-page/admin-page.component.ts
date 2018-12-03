import { Component, OnInit } from '@angular/core';
import { EntityListService } from '../entity-list.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  providers;
  providerForm = false;
  adminForm = false;

  constructor(
    private entityListService: EntityListService
  ) { }

  ngOnInit() {
    this.getProviderList();
  }

  async getProviderList() {
    this.providers = await this.entityListService.getProvidersList();
    console.log(this.providers);
  }

  async addProvider(name: string, address: string) {
    await this.entityListService.addProvider(name, address);
  }

  submitProviderForm() {
    // ToDo: Perform form validation
    // this.addProvider(name, address);
  }

  async addAdmin(address: string) {
    await this.entityListService.addAdmin(address);
  }

  submitAdminForm() {
    // ToDo: Perform form validation
    // this.addAdmin(address);
  }

  async removeProvider(address: string) {
    await this.entityListService.removeProvider(address);
  }

}
