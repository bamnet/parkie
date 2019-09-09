import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { of } from 'rxjs';

import { ShowComponent } from './show.component';
import { ParkService, Park } from '../shared/park.service';
import { VisitService, Visit } from '../../visit/shared/visit.service';
import { ActivatedRouteStub } from 'src/testing/activated-route-stub';



describe('ShowComponent', () => {
  let component: ShowComponent;
  let fixture: ComponentFixture<ShowComponent>;

  const activatedRoute = new ActivatedRouteStub();

  const park: Park = { FullName: 'Test Park 1', Description: 'test location', Code: 'test1' };
  const parkServiceStub = {
    get: jasmine.createSpy('get').and.returnValue(of(park))
  };

  const visits: Visit[] = [{ ParkCode: 'test1', UserID: 'user1' }];
  const visitServiceStub = {
    list: jasmine.createSpy('list').and.returnValue(of(visits))
  };

  beforeEach(async(() => {
    activatedRoute.setParamMap({ code: 'test' });
    TestBed.configureTestingModule({
      imports: [MatIconModule],
      declarations: [ShowComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: activatedRoute,
        }, {
          provide: ParkService,
          useValue: parkServiceStub
        }, {
          provide: VisitService,
          useValue: visitServiceStub
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
    expect(compiled.querySelector('button').textContent).toContain('Visited');
  });
});
