import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminbyidComponent } from './adminbyid.component';

describe('AdminbyidComponent', () => {
  let component: AdminbyidComponent;
  let fixture: ComponentFixture<AdminbyidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminbyidComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminbyidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
