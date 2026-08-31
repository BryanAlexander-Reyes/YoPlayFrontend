import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isProtectedRoute = state.url.includes('/torneo');
  const isLoggedIn = !!localStorage.getItem('usuarioSesion');

  if (isProtectedRoute && !isLoggedIn) {
    router.navigate(['/login_usuario']);
    return false;
  }

  return true;
};
