import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { SecondsColorDirective } from './color.directive';

@Component({
  standalone: true,
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css'],
  imports: [SecondsColorDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimerComponent implements OnInit {
  constructor(private cdr: ChangeDetectorRef) {}

  seconds = 0;
  ngOnInit() {
    setInterval(() => {
      this.seconds += 1;
      this.cdr.detectChanges();
    }, 1000);
  }
}
