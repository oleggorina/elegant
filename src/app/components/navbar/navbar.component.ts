import { ChangeDetectionStrategy, Component, HostListener, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BurgerComponent } from '../burger/burger.component';
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, LogoComponent, BurgerComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  @Input() cartCount: number = 0;

  @HostListener('window:resize', ['$event'])
  onResize() {
    return window.innerWidth
  }
}
