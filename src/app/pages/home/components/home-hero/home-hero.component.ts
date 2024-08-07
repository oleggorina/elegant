import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BtnArrowComponent } from '../../../../components/controls/btn-arrow/btn-arrow.component';

@Component({
  selector: 'app-home-hero',
  standalone: true,
  imports: [BtnArrowComponent, CommonModule, NgOptimizedImage],
  templateUrl: './home-hero.component.html',
  styleUrl: './home-hero.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeHeroComponent {
  slideUrl = [
    '../../../../../assets/images/home/slider/slider1.webp',
    '../../../../../assets/images/home/slider/slider2.webp',
    '../../../../../assets/images/home/slider/slider3.webp',
  ];
  currentIndex: number = 0;

  prev() {
    const isFirstSlide = this.currentIndex === 0;
    const newIndex = isFirstSlide ? this.slideUrl.length - 1 : this.currentIndex - 1;
    this.currentIndex = newIndex;
  }

  next() {
    const isLastSlide = this.currentIndex === this.slideUrl.length - 1;
    const newIndex = isLastSlide ? 0 : this.currentIndex + 1;
    this.currentIndex = newIndex;
  }
  
  getCurrentSlideUrl(): string {
    return `url('${this.slideUrl[this.currentIndex]}')`;
  }

  goToSlide(index: number) {
    this.currentIndex = index;
  }
}
