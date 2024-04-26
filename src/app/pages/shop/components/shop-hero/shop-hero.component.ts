import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavLinksComponent } from '../../../../components/nav-links/nav-links.component';

@Component({
  selector: 'app-shop-hero',
  standalone: true,
  imports: [NavLinksComponent],
  templateUrl: './shop-hero.component.html',
  styleUrl: './shop-hero.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShopHeroComponent {

}
