import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, take } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.currentUser$.pipe(
    take(1),
    map((user) => {
      const isAuth = !!user;
      if (isAuth) {
        return true;
      } else {
        router.navigate(['/not-found']);
        return false;
      }
    }),
  );
};

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.currentUser$.pipe(
    take(1),
    map((user) => {
      const isAdmin = user?.user_metadata?.['role'] === 'admin';
      if (isAdmin) {
        return true;
      } else {
        router.navigate(['/not-found']);
        return false;
      }
    }),
  );
};
