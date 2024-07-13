import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getDownloadURL, uploadBytes } from '@angular/fire/storage';
import { initializeApp } from 'firebase/app';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { getStorage, ref } from 'firebase/storage';
import { BehaviorSubject, from, map, Observable, switchMap, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { OrderInfoInterface, ProductCartInterface, UserInterface } from '../interface/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private firebaseApp = initializeApp(environment.firebaseConfig);
  private auth = getAuth(this.firebaseApp);
  private storage = getStorage(this.firebaseApp);
  private url = 'https://ecommerce-88694-default-rtdb.europe-west1.firebasedatabase.app/users';
  private userSubject = new BehaviorSubject<UserInterface | null>(null);
  private userIdSubject = new BehaviorSubject<string | null>(null);
  user$: Observable<UserInterface | null> = this.userSubject.asObservable();
  
  constructor(private http: HttpClient) {
  }

  setUserId(id: string): void {
    this.userIdSubject.next(id);
  }

  getUserId(): Observable<string | null> {
    return this.userIdSubject.asObservable();
  }
  
  getUser(userId: string): Observable<UserInterface> {
    return this.http.get<UserInterface>(`${this.url}/${userId}.json`).pipe(
      tap(user => this.userSubject.next(user))
    );
  }

  addOrder(userId: string, order: OrderInfoInterface, products: ProductCartInterface[], cost: number, shipping: string) {
    const date = new Date().toISOString();
    return this.http.post<{name: string}>(`${this.url}/${userId}/orders.json`, order)
    .pipe(
      switchMap(response => {
        const orderId = response.name;
        const updatedOrder = {...order, id: orderId, date: date, products: products, cost: cost, delivery: shipping};
        return this.http.patch<OrderInfoInterface>(`${this.url}/${userId}/orders/${orderId}.json`, updatedOrder)
        .pipe(
          map(() => updatedOrder)
        );
      })
    );
  }

  addUserImage(userId: string, file: File) {
    const storageRef = ref(this.storage, `user-images/${userId}/${file.name}`);
    return from(uploadBytes(storageRef, file)).pipe(
      switchMap(() => getDownloadURL(storageRef)),
      switchMap((downloadURL) => this.http.patch<UserInterface>(`${this.url}/${userId}.json`, {
        profileImage: downloadURL
      })),
      switchMap(() => this.getUser(userId)),
      tap(updatedUser => this.userSubject.next(updatedUser))
    );
  }

  addDetailsInfo(userId: string, name: string, surname: string): Observable<UserInterface> {
    return this.http.patch<UserInterface>(`${this.url}/${userId}.json`, {
      name: name,
      surname: surname
    }).pipe(
      switchMap(() => this.getUser(userId)),
      tap(updatedUser => {
        this.userSubject.next(updatedUser);
      })
    );
  }

  addBillingAddress(userId: string, card: number, month: number, year: number) {
    const trimmedCard = String(card).replace(/\D/g, '').slice(0, 16);
    return this.http.patch<UserInterface>(`${this.url}/${userId}.json`, {
      billing: {
        card: trimmedCard,
        month: month,
        year: year
      }
    }).pipe(
      switchMap(() => this.getUser(userId)),
      tap(updatedUser => this.userSubject.next(updatedUser))
    );
  }

  addShipingAddress(userId: string, telephone: number, address: string) {
    return this.http.patch<UserInterface>(`${this.url}/${userId}.json`, {
      shipping: {
        telephone: telephone,
        address: address
      }
    }).pipe(
      switchMap(() => this.getUser(userId)),
      tap(updatedUser => this.userSubject.next(updatedUser))
    );
  }

  sendPasswordResetEmail() {
    return from(sendPasswordResetEmail(this.auth, (this.userSubject.value?.email as string)));
  }
}

// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { getDownloadURL, uploadBytes } from '@angular/fire/storage';
// import { initializeApp } from 'firebase/app';
// import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
// import { getStorage, ref } from 'firebase/storage';
// import { BehaviorSubject, from, map, Observable, switchMap, tap } from 'rxjs';
// import { environment } from '../../environments/environment';
// <<<<<<< HEAD
// import { UserInterface } from '../interface/interfaces';
// =======
// <<<<<<< HEAD
// import { UserInterface } from '../interface/interfaces';
// =======
// import { OrderInfoInterface, ProductCartInterface, UserInterface } from '../interface/interfaces';
// >>>>>>> ecc1c97 (Update cart, wishlist, orders components, optimized routes, small code refactoring)
// >>>>>>> c881331 (Updated cart, wishlist, orders components. Optimized routes and small code refactoring)

// @Injectable({
//   providedIn: 'root'
// })
// export class UserService {
//   private firebaseApp = initializeApp(environment.firebaseConfig);
//   private auth = getAuth(this.firebaseApp);
//   private storage = getStorage(this.firebaseApp);
//   private url = 'https://ecommerce-88694-default-rtdb.europe-west1.firebasedatabase.app/users';
//   private userSubject = new BehaviorSubject<UserInterface | null>(null);
// <<<<<<< HEAD
//   userIdSubject = new BehaviorSubject<string | null>(null);
// =======
// <<<<<<< HEAD
//   userIdSubject = new BehaviorSubject<string | null>(null);
// =======
//   private userIdSubject = new BehaviorSubject<string | null>(null);
// >>>>>>> ecc1c97 (Update cart, wishlist, orders components, optimized routes, small code refactoring)
// >>>>>>> c881331 (Updated cart, wishlist, orders components. Optimized routes and small code refactoring)
//   user$: Observable<UserInterface | null> = this.userSubject.asObservable();
  
//   constructor(private http: HttpClient) {
//   }

// <<<<<<< HEAD
// =======
// <<<<<<< HEAD
// =======
//   setUserId(id: string): void {
//     this.userIdSubject.next(id);
//   }

// >>>>>>> ecc1c97 (Update cart, wishlist, orders components, optimized routes, small code refactoring)
// >>>>>>> c881331 (Updated cart, wishlist, orders components. Optimized routes and small code refactoring)
//   getUserId(): Observable<string | null> {
//     return this.userIdSubject.asObservable();
//   }
  
// <<<<<<< HEAD
//   getUser(userId: string) {
// =======
// <<<<<<< HEAD
//   getUser(userId: string) {
// =======
//   getUser(userId: string): Observable<UserInterface> {
// >>>>>>> ecc1c97 (Update cart, wishlist, orders components, optimized routes, small code refactoring)
// >>>>>>> c881331 (Updated cart, wishlist, orders components. Optimized routes and small code refactoring)
//     return this.http.get<UserInterface>(`${this.url}/${userId}.json`).pipe(
//       tap(user => this.userSubject.next(user))
//     )
//   }

// <<<<<<< HEAD
// =======
// <<<<<<< HEAD
// =======
//   addOrder(userId: string, order: OrderInfoInterface, products: ProductCartInterface[], cost: number, shipping: string) {
//     const date = new Date().toISOString();
//     return this.http.post<{name: string}>(`${this.url}/${userId}/orders.json`, order)
//     .pipe(
//       switchMap(response => {
//         const orderId = response.name;
//         const updatedOrder = {...order, id: orderId, date: date, products: products, cost: cost, delivery: shipping};
//         return this.http.patch<OrderInfoInterface>(`${this.url}/${userId}/orders/${orderId}.json`, updatedOrder)
//         .pipe(
//           map(() => updatedOrder)
//         )
//       })
//     )
//   }

// >>>>>>> ecc1c97 (Update cart, wishlist, orders components, optimized routes, small code refactoring)
// >>>>>>> c881331 (Updated cart, wishlist, orders components. Optimized routes and small code refactoring)
//   addUserImage(userId: string, file: File) {
//     const storageRef = ref(this.storage, `user-images/${userId}/${file.name}`);
//     return from(uploadBytes(storageRef, file)).pipe(
//       switchMap(() => getDownloadURL(storageRef)),
//       switchMap((downloadURL) => this.http.patch<UserInterface>(`${this.url}/${userId}.json`, {
//         profileImage: downloadURL
//       })),
//       switchMap(() => this.getUser(userId)),
//       tap(updatedUser => this.userSubject.next(updatedUser))
//     )
//   }

//   addDetailsInfo(userId: string, name: string, surname: string): Observable<UserInterface> {
//     return this.http.patch<UserInterface>(`${this.url}/${userId}.json`, {
//       name: name,
//       surname: surname
//     }).pipe(
//       switchMap(() => this.getUser(userId)),
//       tap(updatedUser => {
//         this.userSubject.next(updatedUser);
//       })
//     )
//   }

//   addBillingAddress(userId: string, card: number, month: number, year: number) {
//     const trimmedCard = String(card).replace(/\D/g, '').slice(0, 16);
//     return this.http.patch<UserInterface>(`${this.url}/${userId}.json`, {
//       billing: {
//         card: trimmedCard,
//         month: month,
//         year: year
//       }
//     }).pipe(
//       switchMap(() => this.getUser(userId)),
//       tap(updatedUser => this.userSubject.next(updatedUser))
//     )
//   }

//   addShipingAddress(userId: string, telephone: number, address: string) {
//     return this.http.patch<UserInterface>(`${this.url}/${userId}.json`, {
//       shipping: {
//         telephone: telephone,
//         address: address
//       }
//     }).pipe(
//       switchMap(() => this.getUser(userId)),
//       tap(updatedUser => this.userSubject.next(updatedUser))
//     )
//   }

//   sendPasswordResetEmail() {
//     return from(sendPasswordResetEmail(this.auth, (this.userSubject.value?.email as string)))
//   }
// }
