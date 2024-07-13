import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { UserInterface } from '../interface/interfaces';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';

export const authResolver: ResolveFn<Observable<UserInterface>> = (route, state) => {
  return inject(UserService).getUser(String(route.paramMap.get('id')))
};
