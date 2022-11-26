import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateModeleComponent } from './update-modele.component';

describe('UpdateModeleComponent', () => {
  let component: UpdateModeleComponent;
  let fixture: ComponentFixture<UpdateModeleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateModeleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateModeleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
