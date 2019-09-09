import { Component, OnInit, Input } from '@angular/core';
import { VisitService, Visit } from '../shared/visit.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-visit-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  // Thanks for the follow anthonypereira88!
  @Input() parkCode: string;

  visits: Observable<Visit[]>;

  constructor(private visitService: VisitService) { }

  ngOnInit() {
    this.visits = this.visitService.list().pipe(
      map(visits => visits.filter(visit => visit.ParkCode === this.parkCode))
    );
  }

}
