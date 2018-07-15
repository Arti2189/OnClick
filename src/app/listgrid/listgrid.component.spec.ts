import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListgridComponent } from './listgrid.component';

describe('ListgridComponent', () => {
  let component: ListgridComponent;
  let fixture: ComponentFixture<ListgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
