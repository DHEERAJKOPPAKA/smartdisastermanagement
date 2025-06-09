import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletecitizenComponent } from './deletecitizen.component';

describe('DeletecitizenComponent', () => {
  let component: DeletecitizenComponent;
  let fixture: ComponentFixture<DeletecitizenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletecitizenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeletecitizenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
