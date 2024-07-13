import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ModalService } from '../services/modal.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const modal = inject(ModalService);

  if (!authService.isLoggedIn()) {
    modal.modalIsOpen.next(true);
    return false;
  }

  return true;
};