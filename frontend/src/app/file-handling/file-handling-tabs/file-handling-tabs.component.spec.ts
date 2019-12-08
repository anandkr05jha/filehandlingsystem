import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileHandlingTabsComponent } from './file-handling-tabs.component';

describe('FileHandlingTabsComponent', () => {
  let component: FileHandlingTabsComponent;
  let fixture: ComponentFixture<FileHandlingTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileHandlingTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileHandlingTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
