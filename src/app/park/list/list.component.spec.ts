import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../../environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';

import * as fb from 'firebase';

import { ListComponent, Park } from './list.component';
import { from } from 'rxjs';

const parks: Park[][] = [[
  { FullName: 'Test Park', Location: new fb.firestore.GeoPoint(1, 2) },
  { FullName: 'Another Test', Location: new fb.firestore.GeoPoint(1, 2) },
]];

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  const angularFirestoreStub = {
    collection: jasmine.createSpy('collection').and.returnValue({
      valueChanges: jasmine.createSpy('valueChanges').and.returnValue(from(parks))
    })
  };


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
      ],
      providers: [
        { provide: AngularFirestore, useValue: angularFirestoreStub }
      ],
      declarations: [ListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show parks', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('li').textContent).toContain('Test Park');
  });
});
