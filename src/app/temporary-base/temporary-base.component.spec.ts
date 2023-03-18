import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemporaryBaseComponent } from './temporary-base.component';

describe('TemporaryBaseComponent', () => {
  let component: TemporaryBaseComponent;
  let fixture: ComponentFixture<TemporaryBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemporaryBaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemporaryBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
