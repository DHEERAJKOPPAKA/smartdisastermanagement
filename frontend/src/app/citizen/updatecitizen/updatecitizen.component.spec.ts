import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatecitizenComponent } from './updatecitizen.component';

describe('UpdatecitizenComponent', () => {
  let component: UpdatecitizenComponent;
  let fixture: ComponentFixture<UpdatecitizenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatecitizenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdatecitizenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
