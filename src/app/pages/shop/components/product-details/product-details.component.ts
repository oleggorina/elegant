import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DiscountComponent } from '../../../../components/badges/discount/discount.component';
import { NewProductComponent } from '../../../../components/badges/new-product/new-product.component';
import { BtnLightComponent } from '../../../../components/buttons/btn-light/btn-light.component';
import { BtnPrimaryComponent } from '../../../../components/buttons/btn-primary/btn-primary.component';
import { CounterComponent } from '../../../../components/buttons/counter/counter.component';
import { WishlistComponent } from '../../../../components/buttons/wishlist/wishlist.component';
import { BtnArrowComponent } from '../../../../components/controls/btn-arrow/btn-arrow.component';
import { NavLinksComponent } from '../../../../components/nav-links/nav-links.component';
import { NewsletterComponent } from '../../../../components/newsletter/newsletter.component';
import { ProductInterface } from '../../../../interface/interfaces';
import { CarouselService } from '../../../../services/carousel.service';
import { CartService } from '../../../../services/cart.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [NewsletterComponent, BtnArrowComponent, NavLinksComponent, CurrencyPipe, DiscountComponent, NewProductComponent, BtnPrimaryComponent, WishlistComponent, BtnLightComponent, CounterComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  private cartService = inject(CartService);
  private activatedRoute = inject(ActivatedRoute);
  private changeDetectorRef = inject(ChangeDetectorRef);
  carouselService = inject(CarouselService)
  productData!: ProductInterface;
  productSubscription!: Subscription;
  selectedColor!: string;
  productCount: number = 1;

  ngOnInit(): void {
    this.productSubscription = this.activatedRoute.data.subscribe(data => {
      this.productData = data['data'];
      this.changeDetectorRef.detectChanges();
    })
    console.log(this.productData.discount);
    
  }

  ngOnDestroy(): void {
    if(this.productSubscription) this.productSubscription.unsubscribe();
  }

  addToCart(product: ProductInterface, color: string, count: number): void {
    const {title, price, id, discount} = product;
    const image = product.images.length > 0 ? product.images[0].url : '';
    this.cartService.addToCart({id, image, title, color, price, discount, count});
  }

  prev(): void {
    this.carouselService.prev(this.productData.images.map(image => image.url));
  }

  next(): void {
    this.carouselService.next(this.productData.images.map(image => image.url));
  }

  getCurrentSlideUrl(): string {
    return this.carouselService.getCurrentSlideUrl(this.productData.images.map(image => image.url));
  }

  goToSlide(index: number): void {
    this.carouselService.goToSlide(index);
  }

  isSelectedColor(color: string): boolean {
    return color.includes(this.selectedColor)
  }

  onCountChange(count: number): void {
    this.productCount = count;
  }

  onColorSelected(color: string): void {
    const imageName = color;
    const extensionIndex = imageName.lastIndexOf('.');
    const colorTitle = imageName.substring(0, extensionIndex);
    this.selectedColor = colorTitle;
  }

  calculateNewPrice(): number {
    const discountAmount = (this.productData.price * this.productData.discount) / 100;
    const newPrice = this.productData.price - discountAmount;
    return newPrice;
  }

}
