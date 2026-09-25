import { HttpInterceptorFn } from '@angular/common/http';
import { Token } from '../services/token'
import { inject } from '@angular/core';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(Token);

  const token = tokenService.getToken();

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  return next(req);
};



