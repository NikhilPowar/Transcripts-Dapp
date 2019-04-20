import { Component } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ConnectService } from '../connect.service';
import { TranscriptService } from '../transcript.service';
import { EntityListService } from '../entity-list.service';
import { BlockchainService } from '../blockchain.service';
import { ModalDialogService } from '../modal-dialog.service';
import { Router } from '@angular/router';

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
    private modalDialogService: ModalDialogService,
    private router: Router
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

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  async submitApplication() {
    const idContractAddress = this.connectService.getIDContractAddress();
    const collegeAddress = this.college.value.addr;
    let success = false;
    this.modalDialogService.openDialog('Create application', 'Scan the QR code using the wallet used for account creation.');
    this.transcriptService.createApplication(idContractAddress, collegeAddress, this.name.value, this.id.value, this.course.value,
      this.startYear.value, this.completionYear.value).then((event) => {
      event.on('data', (response) => {
        this.modalDialogService.closeDialog();
        console.log(response);
        console.log('Application submitted!');
        const transcriptContractAddress = response.returnValues.applicationAddress;
        console.log('Transcript Contract Address:', transcriptContractAddress);
        this.modalDialogService.openDialog('Submit Application', 'Scan the QR code using the wallet used for account creation.');
        this.transcriptService.addApplication(idContractAddress, collegeAddress, transcriptContractAddress).then((event2) => {
          event2.on('data', (response2) => {
            this.modalDialogService.closeDialog();
            console.log(response2);
            success = true;
            this.router.navigate(['user-page']);
          });
        });
        this.delay(300000).then(() => {
          if (!success) {
            this.modalDialogService.closeDialog();
            alert('The application attempt timed out.');
          }
          return;
        });
      });
    });
    this.delay(600000).then(() => {
      if (!success) {
        this.modalDialogService.closeDialog();
        alert('The application attempt timed out.');
      }
      return;
    });
  }
}
