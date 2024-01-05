import { Injectable, signal } from '@angular/core';
import { setDoc, doc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { catchError, from, map, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserInterface } from '../interface/interfaces';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUserSig = signal<UserInterface | undefined | null>(undefined);
  private firebaseApp = initializeApp(environment.firebaseConfig);
  private auth = getAuth(this.firebaseApp);
  private db = getFirestore(this.firebaseApp);

  constructor(private router: Router) { }

  addUser(email: string, password: string, name: string, surname: string): Observable<any> {
    return from(createUserWithEmailAndPassword(this.auth, email, password))
    .pipe(
      map((userCredential) => {
        setDoc(doc(this.db, 'users', `${userCredential.user.uid}`), {
          name: name,
          surname: surname,
          email: email,
          role: 'user'
        })
      }),
      catchError((error) => {
        const errorMessage = error.message;
        console.log(errorMessage)
        return errorMessage;
      })
    )
  }

  login(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password))
    .pipe(
      map((userCredential) => {
        this.setToken(userCredential.user.refreshToken)
      }),
      catchError((error) => {
        const errorMessage = error.message;
        console.log(errorMessage)
        return errorMessage;
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
