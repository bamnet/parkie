import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowComponent } from './show.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ParkService, Park } from '../shared/park.service';
import { ActivatedRouteStub } from 'src/testing/activated-route-stub';


describe('ShowComponent', () => {
  let component: ShowComponent;
  let fixture: ComponentFixture<ShowComponent>;

  const activatedRoute = new ActivatedRouteStub();

  const park: Park = { FullName: 'Test Park 1', Description: 'test location' };
  const parkServiceStub = {
    get: jasmine.createSpy('get').and.returnValue(of(park))
  };

  beforeEach(async(() => {
    activatedRoute.setParamMap({ code: 'test' });
    TestBed.configureTestingModule({
      declarations: [ShowComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: activatedRoute,
        }, {
          provide: ParkService,
          useValue: parkServiceStub
        },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show a park', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Test Park 1');
  });
});
