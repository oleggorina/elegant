import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HomeArrivalsComponent } from './components/home-arrivals/home-arrivals.component';
import { HomeCategoriesComponent } from './components/home-categories/home-categories.component';
import { HomeHeroComponent } from './components/home-hero/home-hero.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomeHeroComponent, HomeCategoriesComponent, HomeArrivalsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

}
