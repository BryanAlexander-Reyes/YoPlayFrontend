import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthAnimationComponent } from './auth-animation-component';

describe('AuthAnimationComponent', () => {
  let component: AuthAnimationComponent;
  let fixture: ComponentFixture<AuthAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthAnimationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthAnimationComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
