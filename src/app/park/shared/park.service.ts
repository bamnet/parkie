import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, forkJoin } from 'rxjs';
import { first, map } from 'rxjs/operators';

import * as firebase from 'firebase/app';
import 'firebase/firestore';

export interface Park {
  Name?: string;
  FullName?: string;
  Code?: string;
  Description?: string;
  States?: string[];
  URL?: string;
  Location?: firebase.firestore.GeoPoint;
}

@Injectable({
  providedIn: 'root'
})
export class ParkService {

  constructor(private db: AngularFirestore) { }

  list(): Observable<Park[]> {
    return this.db.collection<Park>('parks').valueChanges();
  }

  get(code: string): Observable<Park> {
    return this.db.collection<Park>('parks',
      ref => ref.where('Code', '==', code)
        .limit(1)).valueChanges()
      .pipe(map(parks => parks[0]));
  }
}
