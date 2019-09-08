import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';

import { from, of } from 'rxjs';

import * as firebase from 'firebase/app';
import 'firebase/firestore';

import { environment } from '../../../environments/environment';
import { VisitService, Visit } from './visit.service';
import { AngularFireAuth } from '@angular/fire/auth';

const visits: Visit[][] = [[
  { ParkCode: 'test1', UserID: 'user1' },
]];

const user = {
  uid: '12345',
} as firebase.User;

describe('VisitService', () => {
  const angularFirestoreStub = {
    collection: jasmine.createSpy('collection').and.returnValue({
      doc: jasmine.createSpy('doc').and.returnValue({
        collection: jasmine.createSpy('collection').and.returnValue({
          valueChanges: jasmine.createSpy('valueChanges').and.returnValue(from(visits))
        })
      })
    })
  };

  const angularFireAuthStub = { user: of(user) };

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      AngularFireModule.initializeApp(environment.firebase),
    ],
    providers: [
      { provide: AngularFirestore, useValue: angularFirestoreStub },
      { provide: AngularFireAuth, useValue: angularFireAuthStub },
    ]
  }));

  it('should be created', () => {
    const service: VisitService = TestBed.get(VisitService);
    expect(service).toBeTruthy();
  });

  it('should list visits', () => {
    const service: VisitService = TestBed.get(VisitService);
    service.list().subscribe(
      gotVisits => expect(gotVisits).toEqual(visits[0]),
      fail
    );
  });
});
