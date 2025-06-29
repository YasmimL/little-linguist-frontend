import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-acessibility',
  templateUrl: './acessibility.component.html',
  styleUrls: ['./acessibility.component.scss'],
})
export class AcessibilityComponent {
  defaultSize = 16;
  increment = 2;
  maxIncrease = 3;
  minIncrease = -3;
  currentIncrement = 0;

  constructor(private renderer: Renderer2) {}

  increaseFont() {
    if (this.currentIncrement < this.maxIncrease) {
      this.currentIncrement++;
      this.updateFontSize();
    }
  }

  decreaseFont() {
    if (this.currentIncrement > this.minIncrease) {
      this.currentIncrement--;
      this.updateFontSize();
    }
  }

  resetFont() {
    this.currentIncrement = 0;
    this.updateFontSize();
  }

  private updateFontSize() {
    this.renderer.setStyle(
      document.documentElement,
      'font-size',
      `${this.defaultSize + this.currentIncrement}px`
    );
  }
}
