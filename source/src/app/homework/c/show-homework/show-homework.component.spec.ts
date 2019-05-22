import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowHomeworkComponent } from './show-homework.component';

describe('ShowHomeworkComponent', () => {
  let component: ShowHomeworkComponent;
  let fixture: ComponentFixture<ShowHomeworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowHomeworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowHomeworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
