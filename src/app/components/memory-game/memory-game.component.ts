import { Component } from '@angular/core';
import { GameStatus } from 'src/app/enum/game-status.enum';
import { Card } from 'src/app/models/card';
import { shuffle } from 'src/app/utils/shuffle';

interface GameResult {
  result: 'win' | 'lose';
  score: number;
}

@Component({
  selector: 'app-memory-game',
  templateUrl: './memory-game.component.html',
  styleUrls: ['./memory-game.component.scss'],
})
export class MemoryGameComponent {
  hits: string[] = [];
  selectedCards: Card[] = [];
  time: number = 120;
  timerId?: number;
  gameResult: GameResult | null = null;
  gameStatus: GameStatus = GameStatus.BEGINNING;

  animals = [
    { key: 'dog', word: 'Dog' },
    { key: 'cat', word: 'Cat' },
    { key: 'fish', word: 'Fish' },
    { key: 'owl', word: 'Owl' },
    { key: 'butterfly', word: 'Butterfly' },
    { key: 'cow', word: 'Cow' },
  ];

  cards: Card[] = shuffle(
    this.animals.flatMap((animal) => {
      return [
        {
          type: 'image',
          key: animal.key,
          src: `assets/images/${animal.key}.png`,
        },
        {
          type: 'word',
          key: animal.key,
          word: animal.word,
          wordAudio: `assets/images/${animal.key}.mp3`,
        },
      ];
    })
  );

  get GameStatus() {
    return GameStatus;
  }

  onClickStartGame(): void {
    this.gameStatus = GameStatus.INSTRUCTIONS;
  }

  startGame(): void {
    this.gameStatus = GameStatus.PLAYING;
    this.timerId = window.setInterval(() => {
      this.time--;
      if (this.time === 0) {
        this.finishGame();
      }
    }, 1000);
  }

  restartGame(): void {
    this.time = 120;
    this.hits = [];
    this.selectedCards = [];
    this.gameResult = null;
    this.startGame();
  }

  shouldShowCard(card: Card): boolean {
    if (this.hits.includes(card.key)) {
      return true;
    }

    return this.selectedCards.some(
      (it) => it.key === card.key && it.type === card.type
    );
  }

  selectCard(card: Card): void {
    if (this.hits.includes(card.key)) {
      return;
    }

    this.selectedCards.push(card);

    if (this.selectedCards.length === 1) {
      return;
    }

    const [cardOne, cardTwo] = this.selectedCards;
    if (cardOne.key !== cardTwo.key) {
      setTimeout(() => {
        this.selectedCards = [];
      }, 700);

      return;
    }

    this.hits.push(card.key);
    this.selectedCards = [];

    if (this.hits.length === Object.keys(this.animals).length) {
      setTimeout(() => {
        this.finishGame();
      }, 800);
    }
  }

  finishGame(): void {
    clearInterval(this.timerId);
    this.gameStatus = GameStatus.FINISHED;

    this.gameResult = {
      result:
        this.hits.length === Object.keys(this.animals).length ? 'win' : 'lose',
      score: this.time * 10 + this.hits.length * 20,
    };
  }
}
