import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ModalService } from '../../services/modal.service';
import { BtnPrimaryComponent } from '../buttons/btn-primary/btn-primary.component';
import { LogoComponent } from '../logo/logo.component';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-burger',
  standalone: true,
  imports: [AsyncPipe, ModalComponent, RouterLink, RouterLinkActive, LogoComponent, BtnPrimaryComponent],
  templateUrl: './burger.component.html',
  styleUrl: './burger.component.scss',
  animations: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BurgerComponent {
  isMenuOpen: boolean = false;
  @Input() cartCount: number = 0;
  @Input() wishListCount: number = 0;
  modalService = inject(ModalService)

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  openModal() {
    this.modalService.modalIsOpen.next(true);
  }
}
