import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TorneosComoponent } from './torneos-comoponent';

describe('TorneosComoponent', () => {
  let component: TorneosComoponent;
  let fixture: ComponentFixture<TorneosComoponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TorneosComoponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TorneosComoponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
