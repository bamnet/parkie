import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ParkService, Park } from '../shared/park.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  park$: Observable<Park>;

  constructor(
    private route: ActivatedRoute,
    private parkService: ParkService,
  ) { }

  ngOnInit() {
    this.park$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.parkService.get(params.get('code'))));
  }

}
