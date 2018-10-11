import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistantComponent } from './assistant.component';
import {FormsModule} from "@angular/forms";
import {MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSnackBarModule} from "@angular/material";
import {AlertService} from "../../main/s/alert.service";
import {BaseService} from "../../main/s/base/base.service";

let mockBaseService;

describe('AssistantComponent', () => {
  let component: AssistantComponent;
  let fixture: ComponentFixture<AssistantComponent>;

  beforeEach(async(() => {

    mockBaseService = {
      myKurse: [
        {title: "nvm", fach: "PH1", lehrer: "nvm"},
        {title: "nvm", fach: "Ph", lehrer: "nvm"},
        {title: "nvm", fach: "Ph10", lehrer: "nvm"},
        {title: "nvm", fach: "LZ", lehrer: "nvm"},
        {title: "nvm", fach: "LZ/D", lehrer: "nvm"},
        {title: "nvm", fach: "M1", lehrer: "nvm"},
        {title: "nvm", fach: "D1", lehrer: "nvm"},
        {title: "nvm", fach: "E1", lehrer: "nvm"},
        {title: "nvm", fach: "E", lehrer: "nvm"},
        {title: "nvm", fach: "", lehrer: "nvm"},
        {title: "nvm", fach: "123456", lehrer: "nvm"},
        {title: "nvm", fach: "L", lehrer: "nvm"},
        {title: "nvm", fach: "L1", lehrer: "nvm"},
        {title: "nvm", fach: "L10", lehrer: "nvm"},
        {title: "nvm", fach: "Ku-Mu", lehrer: "nvm"},
        {title: "nvm", fach: "Ku-Mu1", lehrer: "nvm"},
        {title: "nvm", fach: "Ku-Mu10", lehrer: "nvm"},
        {title: "nvm", fach: "Ku", lehrer: "nvm"},
        {title: "nvm", fach: "Ku1", lehrer: "nvm"},
        {title: "nvm", fach: "Ku10", lehrer: "nvm"},
        {title: "nvm", fach: "Mu", lehrer: "nvm"},
        {title: "nvm", fach: "Mu1", lehrer: "nvm"},
        {title: "nvm", fach: "Mu10", lehrer: "nvm"},
      ],
      KlassenKurse: [
        "Theat",
        "ECDL",
        "LM1",
        "LPH1",
        "LD1",
        "PCL",
        "ER",
        "IF1"
      ],
      myStufe: "lol",
      myStufeId: 1,
      credentials: {u: "", p:""}
    };

    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatCardModule,
        MatSnackBarModule
      ],
      declarations: [ AssistantComponent ],
      providers: [AlertService, {provide: BaseService, useValue: mockBaseService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssistantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and initialize', () => {
    expect(component).toBeTruthy();
    expect(component.provider).toBeTruthy();
  });


  it('doPrefills should pass test cases', function () {
    TestBed.overrideProvider(BaseService, {useValue: {myKurse: [], KlassenKurse: []}});
    component.doPrefills();
    console.log(component.aliases);
    return expect(component.aliases).toEqual(
      [
        "Physik",
        "Physik",
        "Physik",
        "Lernzeit",
        "Lernzeit Deutsch",
        "Mathe",
        "Deutsch",
        "Englisch",
        "Englisch",
        undefined,
        undefined,
        "Latein",
        "Latein",
        "Latein",
        "Kunst-Musik",
        "Kunst-Musik",
        "Kunst-Musik",
        "Kunst",
        "Kunst",
        "Kunst",
        "Musik",
        "Musik",
        "Musik",
        "Theater",
        "ECDL",
        "Mathe",
        "Physik",
        "Deutsch",
        "PCL",
        "Religion",
        "Informatik"
      ]);
  });



});
