import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { ParkService, Park } from '../shared/park.service';
import { VisitService } from 'src/app/visit/shared/visit.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  park$: Observable<Park>;
  visited$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private parkService: ParkService,
    private visitService: VisitService,
  ) { }

  ngOnInit() {
    this.park$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.parkService.get(params.get('code'))));

    this.visited$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.visitService.list().pipe(
        map(visits => visits.some(visit => visit.ParkCode === params.get('code')))
      )));
  }

  addVisit(code: string) {
    this.visitService.add(code);
  }
}
