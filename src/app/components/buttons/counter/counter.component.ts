import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterComponent {
  @Input() count: number = 1;
  @Output() countChange = new EventEmitter<number>();

  increment(): void {
    this.count++;
    this.emitCountChange();
  }

  decrement(): void {
    if (this.count > 1) {
      this.count--;
      this.emitCountChange();
    }
  }

  emitCountChange(): void {
    this.countChange.emit(this.count);
  }
}
