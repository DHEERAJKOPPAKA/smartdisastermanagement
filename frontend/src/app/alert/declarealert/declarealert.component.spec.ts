import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclarealertComponent } from './declarealert.component';

describe('DeclarealertComponent', () => {
  let component: DeclarealertComponent;
  let fixture: ComponentFixture<DeclarealertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeclarealertComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeclarealertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
