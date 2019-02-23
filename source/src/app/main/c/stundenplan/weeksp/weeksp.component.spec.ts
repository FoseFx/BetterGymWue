import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekspComponent } from './weeksp.component';

describe('WeekspComponent', () => {
  let component: WeekspComponent;
  let fixture: ComponentFixture<WeekspComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeekspComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekspComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
