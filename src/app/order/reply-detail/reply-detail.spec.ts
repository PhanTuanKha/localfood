import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplyDetail } from './reply-detail';

describe('ReplyDetail', () => {
  let component: ReplyDetail;
  let fixture: ComponentFixture<ReplyDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReplyDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReplyDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
