import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { BlogInterface } from '../interface/interfaces';
import { BlogService } from '../services/blog.service';

export const blogResolver: ResolveFn<BlogInterface> = (route, state) => {
  return inject(BlogService).getArticle(String(route.paramMap.get('id')));
};
