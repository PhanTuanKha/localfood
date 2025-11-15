import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDistance } from './search-distance';

describe('SearchDistance', () => {
  let component: SearchDistance;
  let fixture: ComponentFixture<SearchDistance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchDistance]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchDistance);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
