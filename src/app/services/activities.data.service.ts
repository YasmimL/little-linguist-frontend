import { Injectable } from '@angular/core';
import { Activity } from '../models/activity';

@Injectable({
  providedIn: 'root',
})
export class ActivitiesDataService {
  hitsByActivity: { [key: string]: number | undefined } = {};

  activities: Activity[] = [
    {
      key: 'animals',
      src: 'assets/images/animals.png',
      portugueseName: 'Animais',
      englishName: 'Animals',
      width: '12rem',
      words: [
        {
          key: 'cat',
          src: 'assets/images/cat.png',
          portugueseName: 'Gato',
          englishName: 'Cat',
          width: '5.326rem',
        },
        {
          key: 'dog',
          src: 'assets/images/dog.png',
          portugueseName: 'Cachorro',
          englishName: 'Dog',
          width: '6rem',
        },
        {
          key: 'fish',
          src: 'assets/images/fish.png',
          portugueseName: 'Peixe',
          englishName: 'Fish',
          width: '4.464rem',
        },
        {
          key: 'cow',
          src: 'assets/images/cow.png',
          portugueseName: 'Vaca',
          englishName: 'Cow',
          width: '6.3rem',
        },
        {
          key: 'owl',
          src: 'assets/images/owl.png',
          portugueseName: 'Coruja',
          englishName: 'Owl',
          width: '5.182rem',
        },
        {
          key: 'butterfly',
          src: 'assets/images/butterfly.png',
          portugueseName: 'Borboleta',
          englishName: 'Butterfly',
          width: '4.8rem',
        },
      ],
    },
    {
      key: 'colors',
      src: 'assets/images/colors.png',
      portugueseName: 'Cores',
      englishName: 'Colors',
      width: '9rem',
      words: [],
    },
    {
      key: 'fruits',
      src: 'assets/images/fruits.png',
      portugueseName: 'Frutas',
      englishName: 'Fruits',
      width: '10rem',
      words: [],
    },
    {
      key: 'numbers',
      src: 'assets/images/numbers.png',
      portugueseName: 'Números',
      englishName: 'Numbers',
      width: '9rem',
      words: [],
    },
    {
      key: 'alphabet',
      src: 'assets/images/alphabet.png',
      portugueseName: 'Alfabeto',
      englishName: 'Alphabet',
      width: '10rem',
      words: [],
    },
    {
      key: 'symbols',
      src: 'assets/images/mathematical-symbols.png',
      portugueseName: 'Símbolos Matemáticos',
      englishName: 'Mathematical Symbols',
      width: '10rem',
      words: [],
    },
  ];
}
