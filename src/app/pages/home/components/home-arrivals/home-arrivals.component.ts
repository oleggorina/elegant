import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { LinkComponent } from '../../../../components/buttons/link/link.component';
import { ProductCardComponent } from '../../../../components/cards/product-card/product-card.component';

@Component({
  selector: 'app-home-arrivals',
  standalone: true,
  imports: [LinkComponent, ProductCardComponent],
  templateUrl: './home-arrivals.component.html',
  styleUrl: './home-arrivals.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeArrivalsComponent {
  @HostListener('window:resize', ['$event'])
  onResize() {
    return window.innerWidth;
  }
}
