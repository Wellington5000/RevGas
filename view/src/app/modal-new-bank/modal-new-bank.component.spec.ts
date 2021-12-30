import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNewBankComponent } from './modal-new-bank.component';

describe('ModalNewBankComponent', () => {
  let component: ModalNewBankComponent;
  let fixture: ComponentFixture<ModalNewBankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalNewBankComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalNewBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
