import { Injectable } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { initializeApp } from 'firebase/app';
import { collection, doc, DocumentReference, getDoc, getFirestore, setDoc, updateDoc } from 'firebase/firestore';
import { BehaviorSubject, catchError, from, map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserInterface } from '../interface/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private firebaseApp = initializeApp(environment.firebaseConfig);
  db = getFirestore(this.firebaseApp);

  constructor() {}

  getUser(userId: string): Observable<UserInterface> {
    const userDocRef = doc(this.db, 'users', userId);
    return from(getDoc(userDocRef)).pipe(
      map((docSnapshot) => {
        const user = docSnapshot.data() as UserInterface;
        return user;
      })
    )
  }

  async addBillingAddress(userId: string, card: number, month: number, year: number) {
    const userDocRef = doc(this.db, 'users', userId);
    await updateDoc(userDocRef, {
      billing : {
        card: card,
        month : month,
        year: year
      }
    })
  }

  async addShippingAddress(userId: string, telephone: number, address: string) {
    const userDocRef = doc(this.db, 'users', userId);
    await updateDoc(userDocRef, {
      shipping : {
        telephone: telephone,
        address: address
      }
    })
  }
}
