import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Función CanActivate para proteger rutas.
 * Verifica si el usuario está logueado a través del AuthService.
 */
export const authGuard: CanActivateFn = (route, state) => {
  // Inyección de dependencias para el servicio y el router (el estándar en standalone)
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true; // Si hay token, permite el acceso a /app/dashboard
  } else {
    // Si no hay token, redirige al login
    router.navigate(['/login']);
    return false;
  }
};