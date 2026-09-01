import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const protectedRoutes = ['/crear_torneo', '/inscripcion', '/registro'];
  const isProtectedRoute = protectedRoutes.some((path) => state.url.startsWith(path) || state.url.includes(path));
  const isLoggedIn = !!localStorage.getItem('usuarioSesion');

  if (isProtectedRoute && !isLoggedIn) {
    router.navigate(['/login_usuario']);
    return false;
  }

  return true;
};
