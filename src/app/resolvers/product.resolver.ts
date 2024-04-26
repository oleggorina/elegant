import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ProductInterface } from '../interface/interfaces';
import { ProductService } from '../services/product.service';

export const productResolver: ResolveFn<ProductInterface> = (route, state) => {
  return inject(ProductService).getProduct(String(route.paramMap.get('id')))
};
