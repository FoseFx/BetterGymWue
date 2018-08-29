import {TestBed, inject, async, ComponentFixture} from "@angular/core/testing";
import {BaseService} from "./base.service";
import * as AppMeta from './appMeta.base';
import {AppComponent} from "../../c/A_root/app.component";
import {AppModule} from "../../app.module";

describe('BaseService', () => {
  let fixture: ComponentFixture<AppComponent>;
  let service: BaseService;

  beforeEach(function () {
    TestBed.configureTestingModule({
      imports: [AppModule]
    });

    fixture = TestBed.createComponent(AppComponent);
    service = fixture.debugElement.injector.get(BaseService);
  });


  describe('AppMeta', function () {

    it('should set "ferien" and "ferienEndsOn" accordingly', async(() => {
      AppMeta.checkFerien(service);
      fixture.whenStable().then(function () {
        expect(service.ferien).toBe(false); // TODO
      });

    }));

  });

});
