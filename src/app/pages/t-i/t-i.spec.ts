import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TI } from './t-i';

describe('TI', () => {
  let component: TI;
  let fixture: ComponentFixture<TI>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TI],
    }).compileComponents();

    fixture = TestBed.createComponent(TI);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
