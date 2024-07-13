import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, inject, OnDestroy, OnInit } from '@angular/core';
import { OrderInterface } from '../../../../interface/interfaces';
import { Subscription, switchMap } from 'rxjs';
import { OrderService } from '../../../../services/order.service';
import { UserService } from '../../../../services/user.service';
import { OrderItemComponent } from './components/order-item/order-item.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-account-orders',
  standalone: true,
  imports: [OrderItemComponent, MatProgressSpinnerModule],
  templateUrl: './account-orders.component.html',
  styleUrl: './account-orders.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountOrdersComponent implements OnInit, OnDestroy {
  private changeDetectorRef = inject(ChangeDetectorRef);
  private orderService = inject(OrderService);
  private userService = inject(UserService);
  private subscriptions: Subscription = new Subscription();
  orders!: OrderInterface[];
  
  ngOnInit(): void {
    const userSubscription = this.userService.getUserId().pipe(
      switchMap(userId => {
        return this.orderService.getOrders(userId as string)
      })
    )
    .subscribe({
      next: (orders) => {
        if (orders) {
          this.orders = Object.values(orders);
          this.changeDetectorRef.detectChanges();
        }
      },
      error: (error) => console.log(error)      
    })
    this.subscriptions.add(userSubscription);
  }
  
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    return window.innerWidth;
  }
}
