import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { authGuard } from './auth-guard';

describe('authGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should block inscription routes when the user is not logged in', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    const result = executeGuard({} as any, { url: '/inscripcion/7' } as any);

    expect(result).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/login_usuario']);
  });

  it('should allow inscription routes when the user is logged in', () => {
    localStorage.setItem('usuarioSesion', JSON.stringify({ email: 'user@test.com' }));

    const result = executeGuard({} as any, { url: '/inscripcion/7' } as any);

    expect(result).toBeTrue();
  });
});
