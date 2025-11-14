import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyReply } from './my-reply';

describe('MyReply', () => {
  let component: MyReply;
  let fixture: ComponentFixture<MyReply>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyReply]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyReply);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
