import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sideuser } from './sideuser';

describe('Sideuser', () => {
  let component: Sideuser;
  let fixture: ComponentFixture<Sideuser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sideuser],
    }).compileComponents();

    fixture = TestBed.createComponent(Sideuser);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
