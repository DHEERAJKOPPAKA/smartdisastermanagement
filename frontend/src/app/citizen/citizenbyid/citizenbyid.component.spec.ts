import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitizenbyidComponent } from './citizenbyid.component';

describe('CitizenbyidComponent', () => {
  let component: CitizenbyidComponent;
  let fixture: ComponentFixture<CitizenbyidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitizenbyidComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CitizenbyidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
