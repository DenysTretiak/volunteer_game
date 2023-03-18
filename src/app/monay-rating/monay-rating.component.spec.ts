import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonayRatingComponent } from './monay-rating.component';

describe('MonayRatingComponent', () => {
  let component: MonayRatingComponent;
  let fixture: ComponentFixture<MonayRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonayRatingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonayRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
