import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(Auth);
  const router = inject(Router);

  return authService.user$
    .pipe(
      map(user => {
        if (user?.role === 'admin') {
          return true;
        }
        router.navigate(['/home']);
        return false;
      })
    )
};
