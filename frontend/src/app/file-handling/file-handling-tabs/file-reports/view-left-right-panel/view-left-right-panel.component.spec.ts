import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLeftRightPanelComponent } from './view-left-right-panel.component';

describe('ViewLeftRightPanelComponent', () => {
  let component: ViewLeftRightPanelComponent;
  let fixture: ComponentFixture<ViewLeftRightPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewLeftRightPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLeftRightPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
