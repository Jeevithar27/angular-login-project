import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSearchChildComponent } from './employee-search-child.component';

describe('EmployeeSearchChildComponent', () => {
  let component: EmployeeSearchChildComponent;
  let fixture: ComponentFixture<EmployeeSearchChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeSearchChildComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeSearchChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
