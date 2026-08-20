import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TP } from './t-p';

describe('TP', () => {
  let component: TP;
  let fixture: ComponentFixture<TP>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TP],
    }).compileComponents();

    fixture = TestBed.createComponent(TP);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
