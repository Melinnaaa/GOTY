import { CanMatchFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const hasRoleGuard: CanMatchFn = (route, segments) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const role = authService.getRole();

  // Obtener los roles permitidos desde los datos de la ruta
  const allowedRoles = route.data?.['allowedRoles'];

  // Verificar si el rol del usuario está en la lista de roles permitidos
  if (allowedRoles.includes(Number(role))) {
    return true;
  } else {
    router.navigate(['/login']); // Redirigir a login si el usuario no tiene el rol adecuado
    return false;
  }
};
