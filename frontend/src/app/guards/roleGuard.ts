import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {TokenService} from '../services/token.service';


export const roleGuard = (requiredRoles: string[]): CanActivateFn => {
  return () => {
    const router = inject(Router);
    const tokenService = inject(TokenService);

    if (!tokenService.isTokenExpired()) {
      const userRoles = tokenService.getRoles();
      if (requiredRoles.some(role => userRoles.includes(role))) {
        return true;
      }
    }

    router.navigate(['/']);
    return false;
  };
};
