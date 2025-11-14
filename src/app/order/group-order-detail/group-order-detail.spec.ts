import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupOrderDetail } from './group-order-detail';

describe('GroupOrderDetail', () => {
  let component: GroupOrderDetail;
  let fixture: ComponentFixture<GroupOrderDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupOrderDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupOrderDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
