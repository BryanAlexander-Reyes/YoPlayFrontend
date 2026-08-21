import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfTorneosComponent } from './inf-torneos-component';

describe('InfTorneosComponent', () => {
  let component: InfTorneosComponent;
  let fixture: ComponentFixture<InfTorneosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfTorneosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InfTorneosComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
