import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { AssistantComponent } from './assistant.component';
import {FormsModule} from "@angular/forms";
import {MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSnackBarModule} from "@angular/material";
import {AlertService} from "../../main/s/alert.service";
import {BaseService} from "../../main/s/base/base.service";
import {of} from "rxjs";

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
      credentials: {u: "", p:""},
      httpClient: {
        post: () => {},
        get: () => of(Promise.resolve(true))
      }
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

  describe('signIn', function () {

    it('should handle failed sign In', fakeAsync(()=> {
      fixture.detectChanges();
      //@ts-ignore
      component.AUTH = {signInWithPopup: () => {}};
      const spy1 = spyOn(component.AUTH, "signInWithPopup").and.returnValue(Promise.reject({message:"Network issues"}));
      const spy2 = spyOn(component.alert, "alert");
      component.signIn();
      tick();
      expect(spy1).toHaveBeenCalled();
      expect(spy2).toHaveBeenCalledWith("Network issues", 1);
    }));

    it('should handle successful sign In without db', fakeAsync(() =>{
      fixture.detectChanges();
      //@ts-ignore
      component.AUTH = {signInWithPopup: () => {}};
      const spy1 = spyOn(component.AUTH, "signInWithPopup").and.returnValue(Promise.resolve({
        credential:{
          idToken: "Some Token"
        },
        user: {
          qa: "headerhere.eyJzdWIiOiJsb2wifQ==.validhere"
        }
      }));
      const spy2 = spyOn(component.alert, "alert");
      spyOn(component, "fetchDB").and.returnValue(Promise.resolve()); // skip db
      component.signIn();
      tick();
      expect(spy1).toHaveBeenCalled();
      expect(spy2).not.toHaveBeenCalled();
      expect(component.loginned).toBe(true);

    }));

    it('should handle db responses', fakeAsync(function () {
      fixture.detectChanges();
      component.fetchDB();
      tick();
      expect(component.dbresult).toBe(true);
    }));

  });

});
