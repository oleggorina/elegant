import { NgClass, TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { BtnGridComponent } from '../../../../components/buttons/btn-grid/btn-grid.component';
import { BtnLoadComponent } from '../../../../components/buttons/btn-load/btn-load.component';
import { ProductCardComponent } from '../../../../components/cards/product-card/product-card.component';
import { ProductInterface } from '../../../../interface/interfaces';
import { ProductService } from '../../../../services/product.service';
import { SharedService } from '../../../../services/shared.service';

@Component({
  selector: 'app-shop-products',
  standalone: true,
  imports: [RouterLink, NgClass, BtnGridComponent, ProductCardComponent, BtnLoadComponent, FormsModule, TitleCasePipe],
  templateUrl: './shop-products.component.html',
  styleUrl: './shop-products.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShopProductsComponent implements OnInit, OnDestroy {
  private sharedService = inject(SharedService);
  private productService = inject(ProductService);
  private changeDetectorRef = inject(ChangeDetectorRef);
  productData!: ProductInterface[];
  productDataSubscription!: Subscription;
  categoryData!: string[];
  filteredProducts!: ProductInterface[];
  currentPage = 1;
  productsPerPage = 12;
  totalProducts = 0;
  gridLayout: string = 'grid4x4';
  activeFilter: string = 'grid4x4';
  selectedCategory: string = 'All';
  selectedPrice: string = 'All';
  selectedDate: string = '';
  selectedSort: string = '';

  ngOnInit(): void {
    this.productDataSubscription = this.productService.getProducts()
    .pipe(
      map(products => {
        if (typeof products === 'object') {
          const categoriesSet = new Set<string>();
          Object.values(products).forEach(product => {
            if (product.hasOwnProperty('category')) {
              const categories: string[] = product.category.split(',').map(category => category.trim());
              categories.forEach(category => {
                categoriesSet.add(category)
              })
            }
          })
          this.categoryData = Array.from(categoriesSet);
        }
        return products
      })
    )
    .subscribe((products) => {
      this.totalProducts = Object.values(products).length;
      this.productData = Object.values(products);
      this.filterProductsByCategory();
      this.changeDetectorRef.detectChanges();     
    })
  }

  ngOnDestroy(): void {
    if (this.productDataSubscription) this.productDataSubscription.unsubscribe();
  }

  filterProductsByCategory(): void {
    this.currentPage = 1;
    const startIndex = (this.currentPage - 1) * this.productsPerPage;
    if (this.selectedCategory === 'All') {
      this.filteredProducts = this.productData.slice(startIndex, startIndex + this.productsPerPage);
      
    } else {
      this.filteredProducts = this.productData.filter(product => product.category.includes(this.selectedCategory)).slice(startIndex, startIndex + this.productsPerPage);
    }
  }

  filterProductsByPrice(): void {
    const startIndex = (this.currentPage - 1) * this.productsPerPage;
    switch (this.selectedPrice) {
      case 'Under':
        this.filteredProducts = this.productData.filter(product => product.price < 100).slice(startIndex, startIndex + this.productsPerPage);
        break;
      case 'Over':
        this.filteredProducts = this.productData.filter(product => product.price > 100).slice(startIndex, startIndex + this.productsPerPage);
        break;
      default:
        this.filteredProducts = this.productData;
        break;
    }
  }

  applySort(): void {
    switch (this.selectedSort) {
      case 'priceDesc':
        this.filteredProducts.sort((a,b) => b.price - a.price);
        break;
      case 'priceAsc':
        this.filteredProducts.sort((a,b) => a.price - b.price);
        break;
      default:
        break;
    }
  }

  loadMore(): void {
    this.currentPage++;
    const startIndex = (this.currentPage - 1) * this.productsPerPage;
    let newProducts:  ProductInterface[];
    if (this.selectedCategory === 'All') {
      newProducts = this.productData.slice(startIndex, startIndex + this.productsPerPage);
    } else {
      newProducts = this.productData.filter(product => product.category.includes(this.selectedCategory)).slice(startIndex, startIndex + this.productsPerPage);
    }
    this.filteredProducts = this.filteredProducts.concat(newProducts);
    this.changeDetectorRef.detectChanges();
  }

  showMoreBtn(): boolean {
    if (!this.productData || !this.filteredProducts) {
      return false;
    }
    if (this.selectedCategory === 'All') {
      return this.filteredProducts.length < this.totalProducts;
    } else {
      const categoryProducts = this.productData.filter(product => product.category.includes(this.selectedCategory));
      return this.filteredProducts.length < categoryProducts.length;
    }
  }

  setActiveFilter(filter: string): void {
    this.activeFilter = this.sharedService.setActiveFilter(filter, this.activeFilter);
  }

  changeGridLayout(layout: string): void {
    this.gridLayout = this.sharedService.changeGridLayout(layout);
  }
}
