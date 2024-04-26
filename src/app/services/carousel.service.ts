import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarouselService {
  public currentIndex: number = 0;

  constructor() { }

  prev(images: string[]): void {
    const isFirstSlide = this.currentIndex === 0;
    this.currentIndex = isFirstSlide ? images.length - 1 : this.currentIndex - 1;
  }

  next(images: string[]): void {
    const isLastSlide = this.currentIndex === images.length - 1;
    this.currentIndex = isLastSlide ? 0 : this.currentIndex + 1;
  }

  getCurrentSlideUrl(images: string[]): string {
    return images[this.currentIndex];
  }

  goToSlide(index: number): void {
    this.currentIndex = index;
  }
}
