import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TtcontainerComponent } from './ttcontainer.component';

describe('TtcontainerComponent', () => {
  let component: TtcontainerComponent;
  let fixture: ComponentFixture<TtcontainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TtcontainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TtcontainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
