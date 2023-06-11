import { Component, EventEmitter, Output } from '@angular/core';
import { GameStatus } from 'src/app/enum/game-status.enum';
import { Card } from 'src/app/models/card';
import { CardWord } from 'src/app/models/card-word';
import { GamesPoints } from 'src/app/models/games-points';
import { RankingService } from 'src/app/services/ranking.service';
import { UserDataService } from 'src/app/services/user.data.service';
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
  @Output() gameFinished = new EventEmitter<boolean>();
  hits: string[] = [];
  selectedCards: Card[] = [];
  time: number = 120;
  timerId?: number;
  gameResult: GameResult | null = null;
  _gameStatus: GameStatus = GameStatus.BEGINNING;

  get gameStatus() {
    return this._gameStatus;
  }

  set gameStatus(gameStatus: GameStatus) {
    this._gameStatus = gameStatus;
    this.gameFinished.emit(this._gameStatus === GameStatus.FINISHED);
  }

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
          wordAudio: `assets/audio/${animal.key}.m4a`,
        },
      ];
    })
  );

  get GameStatus() {
    return GameStatus;
  }

  constructor(
    private rankingService: RankingService,
    private userDataService: UserDataService
  ) {}

  onClickStartGame(): void {
    this.gameStatus = GameStatus.INSTRUCTIONS;
  }

  startGame(): void {
    this.gameStatus = GameStatus.PLAYING;
    this.timerId = window.setInterval(() => {
      this.time--;
      if (this.time === 0) {
        this.playNotification('game-over');
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

    if (this.selectedCards.length === 1) {
      const [selectedCard] = this.selectedCards;

      if (selectedCard.key === card.key && selectedCard.type === card.type) {
        return;
      }
    }

    this.selectedCards.push(card);

    if (this.selectedCards.length === 1) {
      return;
    }

    const [cardOne, cardTwo] = this.selectedCards;
    if (cardOne.key !== cardTwo.key) {
      setTimeout(() => {
        this.playNotification('wrong-answer');
        this.selectedCards = [];
      }, 700);

      return;
    }

    this.playNotification('correct-answer');
    this.hits.push(card.key);
    this.selectedCards = [];

    if (this.hits.length === Object.keys(this.animals).length) {
      this.playNotification('congratulations');
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

    this.updateGamePoints();
  }

  playNotification(
    audioKey:
      | 'correct-answer'
      | 'wrong-answer'
      | 'congratulations'
      | 'game-over'
  ) {
    new Audio(`assets/audio/${audioKey}.wav`).play();
  }

  updateGamePoints(): void {
    if (this.userDataService.user) {
      const { nickname } = this.userDataService.user;
      const gamePoint = new GamesPoints(
        nickname,
        0,
        this.gameResult!.score,
        0,
        0,
        this.userDataService.user
      );
      this.rankingService.update(gamePoint, nickname).subscribe(() => {
        this.userDataService.refreshRanking.emit('memoryGame');
      });
    }
  }

  onPlayAudio(card: Card): void {
    const foundCard = this.cards.find(
      (it) => it.key === card.key && it.type === 'word'
    );

    if (foundCard) {
      new Audio((foundCard as CardWord).wordAudio).play();
    }
  }
}
