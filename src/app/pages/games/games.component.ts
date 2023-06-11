import { Component } from '@angular/core';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
})
export class GamesComponent {
  current: number = -1;
  gameFinished = false;

  games = [
    {
      src: 'assets/images/cards.png',
      portugueseName: 'Jogo de Cartas',
      englishName: 'Card Game',
      width: '12rem',
    },
    {
      src: 'assets/images/memory.png',
      portugueseName: 'Jogo da Memória',
      englishName: 'Memory Game',
      width: '8rem',
    },
    {
      src: 'assets/images/hangman.png',
      portugueseName: 'Jogo da Forca',
      englishName: 'Hangman Game',
      width: '8rem',
    },
    {
      src: 'assets/images/puzzle.png',
      portugueseName: 'Quebra-Cabeça',
      englishName: 'Puzzle',
      width: '10rem',
    },
  ];

  selectGame(index: number): void {
    this.current = index;
    setTimeout(() => {
      document
        .querySelector('.game-painel')
        ?.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  }

  onGameFinished() {
    this.gameFinished = true;
    setTimeout(() => {
      document
        .querySelector('.game-ranking')
        ?.scrollIntoView({ behavior: 'smooth' });
    }, 10000);
  }
}
