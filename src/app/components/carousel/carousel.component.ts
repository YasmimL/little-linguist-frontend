import { AfterViewInit, Component, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements AfterViewInit, OnDestroy {
  @Input() images: string[] = [];

  current: number = 0;
  interval?: number;

  constructor() {}

  ngAfterViewInit(): void {
    this.interval = window.setInterval(() => {
      this.next();
    }, 3000);
  }

  ngOnDestroy(): void {
    window.clearInterval(this.interval);
  }

  previous(): void {
    if (this.current > 0) {
      this.current--;
    } else {
      this.current = this.images.length - 1;
    }
  }

  next(): void {
    if (this.current < this.images.length - 1) {
      this.current++;
    } else {
      this.current = 0;
    }
  }

  goToIndex(index: number): void {
    this.current = index;
  }
}
