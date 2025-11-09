import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasword } from './forgot-pasword';

describe('ForgotPasword', () => {
  let component: ForgotPasword;
  let fixture: ComponentFixture<ForgotPasword>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgotPasword]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgotPasword);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
