import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

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
}
