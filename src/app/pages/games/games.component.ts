import { Component, OnInit } from '@angular/core';
import { focusElement } from 'src/app/utils/focus-element';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
})
export class GamesComponent implements OnInit {
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

  ngOnInit(): void {
    setTimeout(() => {
      focusElement(() =>
        document.querySelector('.games-container > .breadcrumb')
      );
    });
  }

  selectGame(index: number): void {
    this.current = index;
    setTimeout(() => {
      const gamePanel = document.querySelector('.game-painel');

      if (gamePanel) {
        const scrollIntoGame = () =>
          gamePanel.scrollIntoView({ behavior: 'smooth' });
        const titleSelector = () => gamePanel.querySelector('.game-title');

        setTimeout(scrollIntoGame, 200);
        setTimeout(() => focusElement(titleSelector), 500);
      }
    });
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
