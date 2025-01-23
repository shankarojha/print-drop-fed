import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrinteeLandingComponent } from './printee-landing.component';

describe('PrinteeLandingComponent', () => {
  let component: PrinteeLandingComponent;
  let fixture: ComponentFixture<PrinteeLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrinteeLandingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrinteeLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
