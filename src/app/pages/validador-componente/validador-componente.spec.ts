import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidadorComponente } from './validador-componente';

describe('ValidadorComponente', () => {
  let component: ValidadorComponente;
  let fixture: ComponentFixture<ValidadorComponente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidadorComponente],
    }).compileComponents();

    fixture = TestBed.createComponent(ValidadorComponente);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
