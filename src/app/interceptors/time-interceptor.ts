import { HttpInterceptorFn, HttpContext, HttpContextToken } from '@angular/common/http';
import { tap } from 'rxjs';

const CHECK_TIME = new HttpContextToken<boolean>(() => false);

export function checkTime() {
  return new HttpContext().set(CHECK_TIME, true);
}

export const timeInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.context.get(CHECK_TIME)) {
    const start = performance.now();
    return next(req)
      .pipe(
        tap(response => {
          const time = (performance.now() - start) + 'ms';
          console.log(req.url, time)
        })
      )
  }
  return next(req);

};
