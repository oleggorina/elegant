import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const checkoutAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const canAccess = sessionStorage.getItem('canAccessCheckout');
  if (canAccess) {
    return true;
  } else {
    router.navigate(['/cart/shopping-cart']);
    return false
  }
};
