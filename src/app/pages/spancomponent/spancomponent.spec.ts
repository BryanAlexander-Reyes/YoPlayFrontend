import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpanComponent } from './spancomponent';

describe('SpanComponent', () => {
  let component: SpanComponent;
  let fixture: ComponentFixture<SpanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpanComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SpanComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
