import { Component } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ConnectService } from '../connect.service';
import { TranscriptService } from '../transcript.service';
import { EntityListService } from '../entity-list.service';
import { BlockchainService } from '../blockchain.service';
import { ModalDialogService } from '../modal-dialog.service';

export class ApplicationErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.css']
})
export class ApplicationFormComponent {
  private id = new FormControl('', [Validators.required]);
  private name = new FormControl('', [Validators.required]);
  private college = new FormControl('', [Validators.required]);
  private course = new FormControl('', [Validators.required]);
  private startYear = new FormControl('', [Validators.required]);
  private completionYear = new FormControl('', [Validators.required]);
  private applicationForm: FormGroup;

  private yearRange: number[];
  private providers: any[];

  matcher = new ApplicationErrorStateMatcher();

  constructor(
    private connectService: ConnectService,
    private transcriptService: TranscriptService,
    private formBuilder: FormBuilder,
    private entityListService: EntityListService,
    private blockchainService: BlockchainService,
    private modalDialogService: ModalDialogService
  ) {
    this.getCollegeList();
    const currentYear = (new Date()).getFullYear();
    let i: number;
    this.yearRange = [];
    for (i = currentYear - 20; i <= currentYear + 5; i++) {
      this.yearRange.push(i);
    }

    this.applicationForm = this.formBuilder.group({
      'id': this.id,
      'name': this.name,
      'college': this.college,
      'course': this.course,
      'startYear': this.startYear,
      'completionYear': this.completionYear
    });
  }

  async getCollegeList() {
    this.providers = await this.entityListService.getProvidersList();
  }

  displayCollege(provider: any) {
    return provider ? provider.name : undefined;
  }

  getErrorMessage(attribute: FormControl) {
    return attribute.hasError('required') ? 'You must enter a value' : '';
  }

  startYearChanged() {
    if (this.startYear.value >= this.completionYear.value) {
      this.completionYear.reset();
    }
  }

  async submitApplication() {
    const idContractAddress = this.connectService.getIDContractAddress();
    const collegeAddress = this.college.value.addr;
    // ToDo: get reference of the contract factory
    // listen for application creation
    // put success code in listener, else timeout
    this.modalDialogService.openDialog('Create application', 'Scan the QR code using the wallet used for account creation.');
    this.transcriptService.createApplication(idContractAddress, collegeAddress, this.name.value, this.id.value, this.course.value,
      this.startYear.value, this.completionYear.value);
  }
}
