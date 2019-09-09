import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import { Visit, VisitService } from '../shared/visit.service';
import { of } from 'rxjs';
import { Component } from '@angular/core';

@Component({
  selector: 'app-test-wrapper',
  template: '<app-visit-list parkCode="test1"></app-visit-list>'
})
class TestComponent { }

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<TestComponent>;

  const visits: Visit[] = [
    { ParkCode: 'test1', UserID: 'user1' },
    { ParkCode: 'test2', UserID: 'user1' },
  ];
  const visitServiceStub = {
    list: jasmine.createSpy('list').and.returnValue(of(visits))
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListComponent, TestComponent],
      providers: [
        {
          provide: VisitService,
          useValue: visitServiceStub,
        }
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a visit', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('li').textContent).toContain('Unknown Date');
    expect(compiled.querySelectorAll('li').length).toBe(1);
  });
});
