import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranscriptFormComponent } from './transcript-form.component';

describe('TranscriptFormComponent', () => {
  let component: TranscriptFormComponent;
  let fixture: ComponentFixture<TranscriptFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranscriptFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranscriptFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
