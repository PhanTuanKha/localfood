import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyReview } from './my-review';

describe('MyReview', () => {
  let component: MyReview;
  let fixture: ComponentFixture<MyReview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyReview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyReview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
