import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileHandlingReportComponent } from './file-handling-report.component';

describe('FileHandlingReportComponent', () => {
  let component: FileHandlingReportComponent;
  let fixture: ComponentFixture<FileHandlingReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileHandlingReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileHandlingReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
