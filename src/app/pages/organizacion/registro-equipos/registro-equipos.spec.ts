import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroEquipos } from './registro-equipos';

describe('RegistroEquipos', () => {
  let component: RegistroEquipos;
  let fixture: ComponentFixture<RegistroEquipos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroEquipos],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroEquipos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
