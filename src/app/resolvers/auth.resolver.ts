import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { UserInterface } from '../interface/interfaces';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

export const authResolver: ResolveFn<UserInterface> = (route, state) => {
  return inject(UserService).getUser(String(route.paramMap.get('id')))
};
