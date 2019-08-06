import { Component, OnInit } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import * as fb from 'firebase';

export interface Park {
  Name?: string;
  FullName?: string;
  Code?: string;
  Description?: string;
  States?: string[];
  URL?: string;
  Location?: fb.firestore.GeoPoint;
}

@Component({
  selector: 'app-park-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  parks: Observable<Park[]>;

  constructor(private db: AngularFirestore) { }

  ngOnInit() {
    this.parks = this.db.collection<Park>('parks').valueChanges();
  }

}
