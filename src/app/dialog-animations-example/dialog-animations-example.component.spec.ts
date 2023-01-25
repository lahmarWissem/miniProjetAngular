import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAnimationsExampleComponent } from './dialog-animations-example.component';

describe('DialogAnimationsExampleComponent', () => {
  let component: DialogAnimationsExampleComponent;
  let fixture: ComponentFixture<DialogAnimationsExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAnimationsExampleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAnimationsExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
