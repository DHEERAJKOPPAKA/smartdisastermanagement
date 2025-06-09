import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatenewcitizenComponent } from './createnewcitizen.component';

describe('CreatenewcitizenComponent', () => {
  let component: CreatenewcitizenComponent;
  let fixture: ComponentFixture<CreatenewcitizenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatenewcitizenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreatenewcitizenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
