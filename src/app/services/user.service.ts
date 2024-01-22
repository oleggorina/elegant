import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { doc, getFirestore, updateDoc } from 'firebase/firestore';
import { BehaviorSubject, from, map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserInterface } from '../interface/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<UserInterface | null>(null);
  private firebaseApp = initializeApp(environment.firebaseConfig);
  private auth = getAuth(this.firebaseApp);
  private db = getFirestore(this.firebaseApp);
  private url = 'https://ecommerce-88694-default-rtdb.europe-west1.firebasedatabase.app/users';
  
  constructor(private http: HttpClient) {}

  getUser(userId: string): Observable<UserInterface> {
    return this.http.get<UserInterface>(`${this.url}/${userId}.json`)
    .pipe(
      map((user) => {
        this.userSubject.next(user)
        return user;
      })
    )
  }

  getUserState(): Observable<UserInterface | null> {
    return this.userSubject.asObservable();
  }

  addBillingAddress(userId: string, card: number, month: number, year: number) {
    const userDocRef = doc(this.db, 'users', userId);
    const trimmedCard = String(card).replace(/\D/g, '').slice(0, 16);
    return from(updateDoc(userDocRef, {
      billing: {
        card: trimmedCard,
        month: month,
        year: year
      }
    }))
  }

  addShippingAddress(userId: string, telephone: number, address: string) {
    const userDocRef = doc(this.db, 'users', userId);
    return from(updateDoc(userDocRef, {
      shipping: {
        telephone: telephone,
        address: address
      }
    }))
  }

  // addDetailsInfo(userId: string, name: string, surname: string): Observable<UserInterface> {
  //   const userDocRef = doc(this.db, 'users', userId);
  //   return from(updateDoc(userDocRef, {
  //     name: name,
  //     surname: surname
  //   })).pipe(
  //     switchMap(() => this.getUser(userId)),
  //     tap(updatedUser => this.userSubject.next(updatedUser))
  //   )
  // }

  sendPasswordResetEmail(email: string) {
    return from(sendPasswordResetEmail(this.auth, email))
  }
}
