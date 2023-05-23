import { Component } from '@angular/core';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss'],
})
export class ActivitiesComponent {
  activities = [
    {
      src: 'assets/images/animals.png',
      portugueseName: 'Animais',
      englishName: 'Animals',
      width: '12rem',
    },
    {
      src: 'assets/images/colors.png',
      portugueseName: 'Cores',
      englishName: 'Colors',
      width: '9rem',
    },
    {
      src: 'assets/images/fruits.png',
      portugueseName: 'Frutas',
      englishName: 'Fruits',
      width: '10rem',
    },
    {
      src: 'assets/images/numbers.png',
      portugueseName: 'Números',
      englishName: 'Numbers',
      width: '9rem',
    },
    {
      src: 'assets/images/alphabet.png',
      portugueseName: 'Alfabeto',
      englishName: 'Alphabet',
      width: '10rem',
    },
    {
      src: 'assets/images/mathematical-symbols.png',
      portugueseName: 'Símbolos Matemáticos',
      englishName: 'Mathematical Symbols',
      width: '10rem',
    },
  ];

  constructor() {}
}
