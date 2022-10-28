import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVoituresComponent } from './list-voitures.component';

describe('ListVoituresComponent', () => {
  let component: ListVoituresComponent;
  let fixture: ComponentFixture<ListVoituresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListVoituresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListVoituresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
