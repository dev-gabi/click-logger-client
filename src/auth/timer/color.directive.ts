import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appColor]',
})
export class SecondsColorDirective {
  @Input() seconds!: number;
  constructor(private element: ElementRef) {}

  ngOnChanges() {
    if (this.seconds < 5) {
      this.element.nativeElement.style.color = 'green';
    } else if (this.seconds >= 5 && this.seconds <= 20) {
      this.element.nativeElement.style.color = 'yellow';
    } else if (this.seconds > 20) {
      this.element.nativeElement.style.color = 'red';
    }
  }
}
