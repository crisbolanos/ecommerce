import { CanActivateFn, Router } from '@angular/router';
import { Token } from '../services/token';
import { inject } from '@angular/core';
import { Auth } from '../services/auth'
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  // const tokenService = inject(Token);
  const router = inject(Router);
  const authService = inject(Auth);

  // const token = tokenService.getToken();
  return authService.user$
    .pipe(
      map(user => {
        if (user) {
          return true;
        }
        router.navigate(['/home']);
        return false;
      })
    )

  // if (token) {
  //   return true;
  // }

  // router.navigate(['/home']);
  // return false;
};
