import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListvlistComponent } from './listvlist.component';

describe('ListvlistComponent', () => {
  let component: ListvlistComponent;
  let fixture: ComponentFixture<ListvlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListvlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListvlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
