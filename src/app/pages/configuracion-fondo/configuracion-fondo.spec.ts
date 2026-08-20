import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracionFondo } from './configuracion-fondo';

describe('ConfiguracionFondo', () => {
  let component: ConfiguracionFondo;
  let fixture: ComponentFixture<ConfiguracionFondo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfiguracionFondo],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfiguracionFondo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
