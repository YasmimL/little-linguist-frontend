import {
  ComponentFixture,
  TestBed,
  discardPeriodicTasks,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { CarouselComponent } from './carousel.component';

describe('CarouselComponent', () => {
  let component: CarouselComponent;
  let fixture: ComponentFixture<CarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarouselComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CarouselComponent);
    component = fixture.componentInstance;

    component.images = ['imagem1.png', 'imagem2.png', 'imagem3.png'];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the previous method', () => {
    const buttonPrevious = fixture.debugElement.nativeElement.querySelector(
      '.carousel-control-prev'
    );

    buttonPrevious.click();
    expect(component.current).toBe(2);

    buttonPrevious.click();
    expect(component.current).toBe(1);
  });

  it('should call the next method', () => {
    const buttonNext = fixture.debugElement.nativeElement.querySelector(
      '.carousel-control-next'
    );

    buttonNext.click();
    expect(component.current).toBe(1);
  });

  it('should call the next method and show first image', () => {
    component.current = 2;
    fixture.detectChanges();

    const buttonNext = fixture.debugElement.nativeElement.querySelector(
      '.carousel-control-next'
    );

    buttonNext.click();
    expect(component.current).toBe(0);
  });

  it('should call the goToIndex method', () => {
    const [, button] = fixture.debugElement.nativeElement.querySelectorAll(
      '.carousel-indicators button'
    );

    button.click();

    expect(component.current).toBe(1);
  });

  it('should call the next method in ngAfterViewInit', fakeAsync(() => {
    component.ngAfterViewInit();
    tick(3005);

    expect(component.current).toBe(1);

    discardPeriodicTasks();
  }));
});
