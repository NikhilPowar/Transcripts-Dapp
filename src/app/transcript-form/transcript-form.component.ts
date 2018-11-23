import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'app-transcript-form',
  providers: [TransactionService],
  templateUrl: './transcript-form.component.html',
  styleUrls: ['./transcript-form.component.css']
})
export class TranscriptFormComponent implements OnInit {

  constructor(
    private transactionService: TransactionService
  ) { }

  ngOnInit() {
  }

  executeTransaction() {
    // Execute some arbitrary transaction
    this.transactionService.dummyTransaction();
  }
}
