import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';

import { from } from 'rxjs';

import * as firebase from 'firebase/app';
import 'firebase/firestore';

import { environment } from '../../../environments/environment';
import { ParkService, Park } from './park.service';


const parks: Park[][] = [[
  { FullName: 'Test Park', Location: new firebase.firestore.GeoPoint(1, 2) },
  { FullName: 'Another Test', Location: new firebase.firestore.GeoPoint(1, 2) },
]];

describe('ParkService', () => {
  const angularFirestoreStub = {
    collection: jasmine.createSpy('collection').and.returnValue({
      valueChanges: jasmine.createSpy('valueChanges').and.returnValue(from(parks))
    })
  };

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      AngularFireModule.initializeApp(environment.firebase),
    ],
    providers: [
      { provide: AngularFirestore, useValue: angularFirestoreStub }
    ]
  }));

  it('should be created', () => {
    const service: ParkService = TestBed.get(ParkService);
    expect(service).toBeTruthy();
  });

  it('should list parks', () => {
    const service: ParkService = TestBed.get(ParkService);
    service.list().subscribe(
      gotParks => expect(gotParks).toEqual(parks[0]),
      fail
    );
  });
});
