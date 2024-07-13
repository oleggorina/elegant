import { Component, HostListener, Input } from '@angular/core';
import { OrderInterface } from '../../../../../../interface/interfaces';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-order-item',
  standalone: true,
  imports: [DatePipe, CurrencyPipe],
  templateUrl: './order-item.component.html',
  styleUrl: './order-item.component.scss'
})
export class OrderItemComponent {
  @Input() order!: OrderInterface;

  @HostListener('window:resize', ['$event'])
  onResize() {
    return window.innerWidth;
  }
}
