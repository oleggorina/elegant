import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ShopHeroComponent } from './components/shop-hero/shop-hero.component';
import { ShopProductsComponent } from './components/shop-products/shop-products.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [ShopHeroComponent, ShopProductsComponent, MatProgressSpinnerModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShopComponent {

}
