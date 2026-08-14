import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreacionTorneo } from './creacion-torneo';

describe('CreacionTorneo', () => {
  let component: CreacionTorneo;
  let fixture: ComponentFixture<CreacionTorneo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreacionTorneo],
    }).compileComponents();

    fixture = TestBed.createComponent(CreacionTorneo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
