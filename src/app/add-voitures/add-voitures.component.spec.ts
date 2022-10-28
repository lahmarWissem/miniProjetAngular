import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVoituresComponent } from './add-voitures.component';

describe('AddVoituresComponent', () => {
  let component: AddVoituresComponent;
  let fixture: ComponentFixture<AddVoituresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddVoituresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddVoituresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
