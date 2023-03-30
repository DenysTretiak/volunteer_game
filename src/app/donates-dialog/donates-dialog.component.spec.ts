import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonatesDialogComponent } from './donates-dialog.component';

describe('DonatesDialogComponent', () => {
  let component: DonatesDialogComponent;
  let fixture: ComponentFixture<DonatesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonatesDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonatesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
