import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditFileReportComponent } from './add-edit-file-report.component';

describe('AddEditFileReportComponent', () => {
  let component: AddEditFileReportComponent;
  let fixture: ComponentFixture<AddEditFileReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditFileReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditFileReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
