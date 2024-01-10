import { Injectable, NgZone, signal } from '@angular/core';
import { setDoc, doc, Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, User, UserCredential } from 'firebase/auth';
import { getDoc, getFirestore } from 'firebase/firestore';
import { BehaviorSubject, catchError, from, map, Observable, switchMap, throwError } from 'rxjs';
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
  private db = getFirestore(this.firebaseApp);
  private zone = new NgZone({});
  userId$: Observable<string | null> = this.userIdSubject.asObservable();
  userRole$: Observable<string> = this.userRoleSubject.asObservable();

  constructor(private router: Router, private firestore: Firestore) { 
      onAuthStateChanged(this.auth, (user: User | null) => {
        this.zone.run(() => {
          if (user) {
            const userId = user.uid;
            this.userIdSubject.next(userId);
            this.getUserRole(userId);
            
          } else {
            this.userIdSubject.next(null);
          }
        })
      })
    }

  addUser(email: string, password: string, name: string, surname: string) {
    return from(createUserWithEmailAndPassword(this.auth, email, password))
    .pipe(
      map((userCredential) => {
        setDoc(doc(this.db, 'users', `${userCredential.user.uid}`), {
          name: name,
          surname: surname,
          email: email,
          role: 'customer'
        })
      }),
      catchError((error) => {
        const errorMessage = error.message;
        console.log(errorMessage)
        return errorMessage;
      })
    )
  }

  login(email: string, password: string): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(this.auth, email, password))
    .pipe(
      map((userCredential) => {
        const userId = userCredential.user.uid;
        this.userIdSubject.next(userId);
        this.setToken(userCredential.user.refreshToken);
        return userCredential;
      }),
      catchError((error) => {
        let errorMessage = 'An error occurred during login';
        if (error.code === 'auth/invalid-credential') {
          errorMessage = 'Invalid email or password';
        } else {
          errorMessage = error.message
        }
        return throwError(() => errorMessage);
      })
    )
  }

  getUser(userId: string): Observable<UserInterface> {
    const userDocRef = doc(this.firestore, 'users', userId);
    return from(getDoc(userDocRef)).pipe(
      map((docSnapshot) => {
        return docSnapshot.data() as UserInterface;
      })
    )
  }

  getUserRole(userId: string): Observable<string> {
    const userDocRef = doc(this.firestore, 'users', userId);
    return from(getDoc(userDocRef)).pipe(
      map((docSnapshot) => {
        const userRole = (docSnapshot.data() as {role: string}).role;
        this.userRoleSubject.next(userRole);
        return userRole
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
