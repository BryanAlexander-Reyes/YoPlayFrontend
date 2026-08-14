import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tyc } from './tyc';

describe('Tyc', () => {
  let component: Tyc;
  let fixture: ComponentFixture<Tyc>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tyc],
    }).compileComponents();

    fixture = TestBed.createComponent(Tyc);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
