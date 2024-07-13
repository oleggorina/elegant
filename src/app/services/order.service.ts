import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { OrderInterface } from '../interface/interfaces';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private url: string = 'https://ecommerce-88694-default-rtdb.europe-west1.firebasedatabase.app/users';
  private orderIdSubject = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) { }

  getOrder(userId: string, orderId: string): Observable<OrderInterface> {
    return this.http.get<OrderInterface>(`${this.url}/${userId}/orders/${orderId}.json`);
  }

  getOrders(userId: string): Observable<OrderInterface[]> {
    return this.http.get<OrderInterface[]>(`${this.url}/${userId}/orders.json`)
  }

  setOrderId(orderId: string | null) {
    this.orderIdSubject.next(orderId);
  }

  getOrderId(): string | null {
    return this.orderIdSubject.value;
  }
}
