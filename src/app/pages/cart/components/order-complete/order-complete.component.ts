import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { OrderInterface } from '../../../../interface/interfaces';
import { Subscription } from 'rxjs';
import { OrderService } from '../../../../services/order.service';
import { NumberBadgeComponent } from '../../../../components/badges/number-badge/number-badge.component';
import { BtnPrimaryComponent } from '../../../../components/buttons/btn-primary/btn-primary.component';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-order-complete',
  standalone: true,
  imports: [NumberBadgeComponent, BtnPrimaryComponent, CurrencyPipe, DatePipe],
  templateUrl: './order-complete.component.html',
  styleUrl: './order-complete.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class OrderCompleteComponent implements OnInit, OnDestroy {
  private changeDetectorRef = inject(ChangeDetectorRef);
  private orderService = inject(OrderService);
  private userService = inject(UserService);
  private router = inject(Router);
  order!: OrderInterface;
  orderSubscription!: Subscription;
  userSubscription!: Subscription;
  
  ngOnInit(): void {
    const orderId = this.orderService.getOrderId();
    this.userSubscription = this.userService.getUserId().subscribe({
      next: (userId) => {
        if (userId || orderId) {
          this.orderSubscription = this.orderService.getOrder((userId as string), (orderId as string)).subscribe(order => {
            this.order = order;
            this.changeDetectorRef.detectChanges();
          })
        } else {
          console.log('Order ID is missing');          
        }
      },
      error: (error) => console.log(error)      
    })
  }

  ngOnDestroy(): void {
    if (this.orderSubscription) this.orderSubscription.unsubscribe();
    if (this.userSubscription) this.userSubscription.unsubscribe();
    this.orderService.setOrderId(null);
  }

  allOrders(): void {
    this.router.navigateByUrl('account/orders');
  }
}
