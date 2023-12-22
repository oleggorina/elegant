import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BtnPrimaryComponent } from '../buttons/btn-primary/btn-primary.component';
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'app-burger',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, LogoComponent, BtnPrimaryComponent],
  templateUrl: './burger.component.html',
  styleUrl: './burger.component.scss',
  animations: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BurgerComponent {
  isMenuOpen: boolean = false;
  @Input() cartCount: number = 0;
  @Input() wishListCount: number = 0;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
