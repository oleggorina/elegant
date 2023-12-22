import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HomeHeroComponent } from './components/home-hero/home-hero.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomeHeroComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

}
