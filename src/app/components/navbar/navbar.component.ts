import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener, inject, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ModalService } from '../../services/modal.service';
import { BurgerComponent } from '../burger/burger.component';
import { LogoComponent } from '../logo/logo.component';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [AsyncPipe, RouterLink, RouterLinkActive, LogoComponent, BurgerComponent, ModalComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  @Input() cartCount: number = 0;
  modalService = inject(ModalService);

  openModal() {
    this.modalService.modalIsOpen.next(true);
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    return window.innerWidth
  }
}
