import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatenewadminComponent } from './createnewadmin.component';

describe('CreatenewadminComponent', () => {
  let component: CreatenewadminComponent;
  let fixture: ComponentFixture<CreatenewadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatenewadminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreatenewadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
