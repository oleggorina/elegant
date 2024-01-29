import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone, signal } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { getDatabase, ref, set } from '@angular/fire/database';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { BehaviorSubject, catchError, from, map, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserInterface } from '../interface/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private firebaseApp = initializeApp(environment.firebaseConfig);
  private auth = getAuth(this.firebaseApp);
  private db = getDatabase();

  constructor(private firestore: Firestore, private http: HttpClient, private router: Router) { }

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

  // addUser(email: string, password: string, name: string, surname: string) {
  //   const createUserUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAMQuZuO9-2PJm_CxmDjuPfjzYUU-nZJM0'
  //   return this.http.post(createUserUrl, {
  //     email: email,
  //     password: password,
  //     returnSecureToken: true
  //   }).pipe(
  //     map((authResponse: any) => {
  //       console.log('authResponse: ', authResponse);
  //       const userData = {
  //         id: authResponse.localId,
  //         name: name,
  //         surname: surname,
  //         email: email,
  //         role: 'customer',
  //         billing: {
  //           card: '',
  //           month: '',
  //           year: ''
  //         },
  //         shipping: {
  //           telephone: '',
  //           address: ''
  //         }
  //       };
  //       from(set(ref(this.db, `users/${authResponse.localId}`), userData))
  //       .subscribe()
  //     })
  //   )
  // }

  // login(email: string, password: string) {
  //   const loginUserUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAMQuZuO9-2PJm_CxmDjuPfjzYUU-nZJM0';
  //   return from(this.http.post(loginUserUrl, {
  //     email: email,
  //     password: password,
  //     returnSecureToken: true
  //   })).pipe(
  //     map((userCredential: any) => {
  //       const userId = userCredential.localId;
  //       this.userIdSubject.next(userId);
  //       this.setToken(userCredential.refreshToken);
  //       this.setUserRole(userId);
  //       return userCredential
  //     }),
  //     catchError((error) => {
  //       let errorMessage = 'An error occurred during login';
  //       if (error.code === 'auth/invalid-credential') {
  //         errorMessage = 'Invalid email or password';
  //       } else {
  //         errorMessage = error.message;
  //       }
  //       return throwError(() => errorMessage);
  //     })
  //   )
  // }

  // private setUserRole(userId: string): void {
  //   this.http.get<{role: string}>(`${this.url}/users/${userId}.json`)
  //   .subscribe((user) => {
  //     const userRole = user.role;
  //     this.userRoleSubject.next(userRole);
  //   })
  // }

  // logout() {
  //   localStorage.removeItem('token');
  //   this.router.navigateByUrl('home');
  // }

  // setToken(token: string) {
  //   localStorage.setItem('token', token);
  // }

  // getToken() {
  //   return localStorage.getItem('token');
  // }

  // isLoggedIn() {
  //   return this.getToken() !== null;
  // }
}
