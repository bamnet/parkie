import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Park, ParkService } from '../shared/park.service';

@Component({
  selector: 'app-park-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  parks: Observable<Park[]>;

  constructor(private parkService: ParkService) { }

  ngOnInit() {
    this.parks = this.parkService.list();
  }

}
