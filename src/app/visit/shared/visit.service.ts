import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

export interface Visit {
  UserID: string;
  ParkCode: string;
  Date?: firebase.firestore.Timestamp;
}

@Injectable({
  providedIn: 'root'
})
export class VisitService {

  userId: string;

  constructor(
    private db: AngularFirestore,
    public auth: AngularFireAuth,
  ) {
    this.auth.user.subscribe(user => this.userId = (user ? user.uid : ''));
  }

  private get userRef() {
    return this.db.collection('users').doc(this.userId);
  }

  list(): Observable<Visit[]> {
    return this.userRef.collection<Visit>('visits').valueChanges();
  }

  add(code: string) {
    const visit: Visit = {
      UserID: this.userId,
      ParkCode: code,
    };
    const res = this.userRef.collection<Visit>('visits').add(visit);
  }
}
