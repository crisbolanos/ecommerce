import { CanDeactivateFn } from '@angular/router';
import { Observable } from 'rxjs';

export interface IOnExit {
  onExit: () => Observable<boolean> | Promise<boolean> | boolean;
}

export const exitGuard: CanDeactivateFn<IOnExit> = (component: IOnExit) => {
  if (component.onExit) {
    return component.onExit();
  }
  return true;
};
