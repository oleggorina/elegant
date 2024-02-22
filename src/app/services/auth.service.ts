import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { getDatabase, ref, set } from '@angular/fire/database';
import { Router } from '@angular/router';
import { catchError, from, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private db = getDatabase();

  constructor(private firestore: Firestore, private http: HttpClient, private router: Router) { 
  }

  register(email: string, password: string, name: string, surname: string) {
    const createUserUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAMQuZuO9-2PJm_CxmDjuPfjzYUU-nZJM0';
    return this.http.post(createUserUrl, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      map((authResponse: any) => {
        const userData = {
          id: authResponse.localId,
          name: name,
          surname: surname,
          email: email,
          role: 'customer',
          billing: {
            card: '',
            month: '',
            year: ''
          },
          shipping: {
            telephone: '',
            address: ''
          }
        };
        from(set(ref(this.db, `users/${authResponse.localId}`), userData))
          .subscribe()
      })
    )
  }

  login(email: string, password: string) {
    const loginUserUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAMQuZuO9-2PJm_CxmDjuPfjzYUU-nZJM0';
    return this.http.post(loginUserUrl, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      catchError((error) => {
        let errorMessage = 'An error occurred during login';
        if (error.code === 'auth/invalid-credential') {
          errorMessage = 'Invalid email or password';
        } else {
          errorMessage = error.message;
        }
        return throwError(() => errorMessage);
      })
    )
  }
  
  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('home');
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }
}
