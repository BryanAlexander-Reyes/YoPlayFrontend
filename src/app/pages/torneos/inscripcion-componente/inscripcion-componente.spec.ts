import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscripcionComponente } from './inscripcion-componente';

describe('InscripcionComponente', () => {
  let component: InscripcionComponente;
  let fixture: ComponentFixture<InscripcionComponente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InscripcionComponente],
    }).compileComponents();

    fixture = TestBed.createComponent(InscripcionComponente);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
