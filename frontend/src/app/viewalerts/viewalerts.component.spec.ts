import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewalertsComponent } from './viewalerts.component';

describe('ViewalertsComponent', () => {
  let component: ViewalertsComponent;
  let fixture: ComponentFixture<ViewalertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewalertsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewalertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
