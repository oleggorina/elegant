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
  currentUserSig = signal<UserInterface | undefined | null>(undefined);
  private userIdSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  private userRoleSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private firebaseApp = initializeApp(environment.firebaseConfig);
  private auth = getAuth(this.firebaseApp);
  private db = getDatabase();
  private zone = new NgZone({});
  userId$: Observable<string | null> = this.userIdSubject.asObservable();
  userRole$: Observable<string> = this.userRoleSubject.asObservable();

  private url: string = 'https://ecommerce-88694-default-rtdb.europe-west1.firebasedatabase.app/';

  constructor(private router: Router, private firestore: Firestore, private http: HttpClient) {
    onAuthStateChanged(this.auth, (user: User | null) => {
      this.zone.run(() => {
        if (user) {
          const userId = user.uid;
          this.userIdSubject.next(userId);
          this.setUserRole(userId);
        } else {
          this.userIdSubject.next(null);
        }
      })
    })
  }

  addUser(email: string, password: string, name: string, surname: string) {
    const createUserUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAMQuZuO9-2PJm_CxmDjuPfjzYUU-nZJM0'
    return this.http.post(createUserUrl, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      map((authResponse: any) => {
        console.log('authResponse: ', authResponse);
        const userData = {
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
    return from(this.http.post(loginUserUrl, {
      email: email,
      password: password,
      returnSecureToken: true
    })).pipe(
      map((userCredential: any) => {
        const userId = userCredential.localId;
        this.userIdSubject.next(userId);
        this.setToken(userCredential.refreshToken);
        this.setUserRole(userId);
        return userCredential
      }),
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

  private setUserRole(userId: string): void {
    this.http.get<{role: string}>(`${this.url}/users/${userId}.json`)
    .subscribe((user) => {
      const userRole = user.role;
      this.userRoleSubject.next(userRole);
    })
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
