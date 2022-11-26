import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListModelesComponent } from './list-modeles.component';

describe('ListModelesComponent', () => {
  let component: ListModelesComponent;
  let fixture: ComponentFixture<ListModelesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListModelesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListModelesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
