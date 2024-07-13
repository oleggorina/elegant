import { LinkComponent } from '../../../../components/buttons/link/link.component';
import { ProductCardComponent } from '../../../../components/cards/product-card/product-card.component';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit, inject } from '@angular/core';
import { ProductInterface } from '../../../../interface/interfaces';
import { Subscription, map } from 'rxjs';
import { ProductService } from '../../../../services/product.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-arrivals',
  standalone: true,
  imports: [LinkComponent, ProductCardComponent, RouterLink],
  templateUrl: './home-arrivals.component.html',
  styleUrl: './home-arrivals.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HomeArrivalsComponent implements OnInit, OnDestroy {
  private productService = inject(ProductService);
  private changeDetectorRef = inject(ChangeDetectorRef);
  products!: ProductInterface[];
  productsSubscription!: Subscription;

  ngOnInit(): void {
    this.productsSubscription = this.productService.getProducts().pipe(
      map(products => {
        if (!Array.isArray(products)) {
          products = Object.values(products);
        } if (Array.isArray(products)) {
          return products.slice(-10);
        }
        return [];
      })
    )
    .subscribe({
      next: (products) => {
        this.products = products;
        this.changeDetectorRef.detectChanges();
      },
      error: (error) => console.log(error)      
    })
  }

  ngOnDestroy(): void {
    if (this.productsSubscription) this.productsSubscription.unsubscribe();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    return window.innerWidth;
  }
}
