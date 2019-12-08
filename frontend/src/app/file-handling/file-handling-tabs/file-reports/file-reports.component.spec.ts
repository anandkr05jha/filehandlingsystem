import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileReportsComponent } from './file-reports.component';

describe('FileReportsComponent', () => {
  let component: FileReportsComponent;
  let fixture: ComponentFixture<FileReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
