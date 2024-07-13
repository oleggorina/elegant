import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, inject, Input, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ModalService } from '../../services/modal.service';
import { NumberBadgeComponent } from '../badges/number-badge/number-badge.component';
import { BurgerComponent } from '../burger/burger.component';
import { LogoComponent } from '../logo/logo.component';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NumberBadgeComponent, AsyncPipe, RouterLink, RouterLinkActive, LogoComponent, BurgerComponent, ModalComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class NavbarComponent implements OnInit {
  private cartService = inject(CartService);
  private changeDetectorRef = inject(ChangeDetectorRef);
  @Input() cartCount: number = 0;
  modalService = inject(ModalService);
  cartProducts: number = 0;

  ngOnInit(): void {
    this.cartService.getCartItemsLength().subscribe(length => {
      this.cartProducts = length;
      this.changeDetectorRef.detectChanges();
    })
  }

  openModal() {
    this.modalService.modalIsOpen.next(true);
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    return window.innerWidth
  }
}
