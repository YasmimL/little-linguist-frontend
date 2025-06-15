import { Component, Input } from '@angular/core';
import { ScreenReaderAnnouncerService } from 'src/app/services/screen-reader-announcer.service';
import { Image } from './carousel.interface';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent {
  @Input() images: Image[] = [];

  current: number = 0;

  constructor(
    private screenReaderAnnouncerService: ScreenReaderAnnouncerService
  ) {}

  previous(): void {
    if (this.current > 0) {
      this.current--;
    } else {
      this.current = this.images.length - 1;
    }
    this.announceCurrentImage();
  }

  next(): void {
    if (this.current < this.images.length - 1) {
      this.current++;
    } else {
      this.current = 0;
    }
    this.screenReaderAnnouncerService.postMessage(
      this.images[this.current].alt
    );
    this.announceCurrentImage();
  }

  announceCurrentImage() {
    this.screenReaderAnnouncerService.postMessage(
      this.images[this.current].alt
    );
  }

  goToIndex(index: number): void {
    this.current = index;
  }
}
