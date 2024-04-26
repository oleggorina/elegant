import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WishlistComponent {
  @Input() isInWishlist: boolean = false;
}
