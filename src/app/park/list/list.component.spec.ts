import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../../environments/environment';

import * as firebase from 'firebase/app';
import 'firebase/firestore';

import { from } from 'rxjs';

import { ListComponent } from './list.component';
import { ParkService, Park } from '../shared/park.service';

const parks: Park[][] = [[
  { FullName: 'Test Park', Location: new firebase.firestore.GeoPoint(1, 2) },
  { FullName: 'Another Test', Location: new firebase.firestore.GeoPoint(1, 2) },
]];

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  const parkServiceStub = {
    list: jasmine.createSpy('collection').and.returnValue(from(parks))
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
      ],
      providers: [
        { provide: ParkService, useValue: parkServiceStub }
      ],
      declarations: [ListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show parks', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('li').textContent).toContain('Test Park');
  });
});
