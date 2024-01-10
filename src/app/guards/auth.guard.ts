import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { combineLatest, from, map } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ModalService } from '../services/modal.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const modal = inject(ModalService);
  if(!authService.isLoggedIn()) {
    modal.modalIsOpen.next(true);
    return false
  }
  return true;
};

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return from(authService.userRole$).pipe(
    map((role) => {
      if (role === 'admin') {
        return true
      } else {
        router.navigateByUrl('account/details');
        return false
      }
    })
  )
};