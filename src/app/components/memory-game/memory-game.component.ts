import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { GameStatus } from 'src/app/enum/game-status.enum';
import { Card } from 'src/app/models/card';
import { CardWord } from 'src/app/models/card-word';
import { GamesPoints } from 'src/app/models/games-points';
import { RankingService } from 'src/app/services/ranking.service';
import { ScreenReaderAnnouncerService } from 'src/app/services/screen-reader-announcer.service';
import { UserDataService } from 'src/app/services/user.data.service';
import { focusElement } from 'src/app/utils/focus-element';
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
export class MemoryGameComponent implements OnDestroy {
  @Output() gameFinished = new EventEmitter<boolean>();
  hits: string[] = [];
  selectedCards: Card[] = [];
  time: number = 180;
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
    { key: 'dog', word: 'Dog', portuguese: 'Cachorro' },
    { key: 'cat', word: 'Cat', portuguese: 'Gato' },
    { key: 'fish', word: 'Fish', portuguese: 'Peixe' },
    { key: 'owl', word: 'Owl', portuguese: 'Coruja' },
    { key: 'butterfly', word: 'Butterfly', portuguese: 'Borboleta' },
    { key: 'cow', word: 'Cow', portuguese: 'Vaca' },
  ];

  cards: Card[] = shuffle(
    this.animals.flatMap((animal) => {
      return [
        {
          type: 'image',
          key: animal.key,
          src: `assets/images/${animal.key}.png`,
          portuguese: animal.portuguese,
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
    private userDataService: UserDataService,
    private screenReaderAnnouncerService: ScreenReaderAnnouncerService
  ) {}

  ngOnDestroy(): void {
    this.clearGame();
    this.screenReaderAnnouncerService.postMessage('O jogo foi finalizado');
  }

  onClickStartGame(): void {
    this.gameStatus = GameStatus.INSTRUCTIONS;
    setTimeout(() => {
      this.screenReaderAnnouncerService.postMessage(`
        Bem-vindo ao jogo da memória!
        Seu objetivo é encontrar os pares de cartas,
        combinando a carta com a figura de um animal
        com a carta com o nome dele em inglês.
        Divirta-se e boa sorte!
      `);
      focusElement(() => document.querySelector('.start-game-button'));
    });
  }

  startGame(): void {
    this.gameStatus = GameStatus.PLAYING;
    setTimeout(() => {
      focusElement(() => document.querySelector('app-memory-game-card'));
    });
    this.timerId = window.setInterval(() => {
      this.time--;
      if (this.time === 0) {
        this.playNotification('game-over');
        this.finishGame();
      }
      if (this.time % 30 === 0) {
        this.screenReaderAnnouncerService.postMessage(
          `Faltam ${this.time} segundos para o fim do jogo`
        );
      }
    }, 1000);
  }

  clearGame(): void {
    clearInterval(this.timerId);
    this.gameStatus = GameStatus.BEGINNING;
    this.time = 120;
    this.hits = [];
    this.selectedCards = [];
    this.gameResult = null;
  }

  restartGame(): void {
    this.clearGame();
    this.startGame();
  }

  shouldShowCard(card: Card): boolean {
    if (this.isCardMatched(card)) {
      return true;
    }

    return this.isCardSelected(card);
  }

  announceCardSelected(card: Card): void {
    if (card.type === 'image') {
      this.screenReaderAnnouncerService.postMessage(
        `Carta virada: ${card.portuguese}`
      );
    } else {
      this.screenReaderAnnouncerService.postMessage(
        'Carta de áudio virada, navegue até o botão para reproduzir o áudio.'
      );
    }
  }

  selectCard(card: Card): void {
    if (this.isCardMatched(card)) {
      return;
    }

    if (this.selectedCards.length === 1 && this.isCardSelected(card)) {
      this.selectedCards = [];
      setTimeout(
        () => this.screenReaderAnnouncerService.postMessage('Carta desvirada'),
        300
      );
      return;
    }

    this.selectedCards.push(card);

    if (this.selectedCards.length === 1) {
      setTimeout(() => this.announceCardSelected(card), 300);
      return;
    }

    const [cardOne, cardTwo] = this.selectedCards;
    if (cardOne.key !== cardTwo.key) {
      setTimeout(() => {
        this.playNotification('wrong-answer');
        this.selectedCards = [];
        setTimeout(() => {
          this.screenReaderAnnouncerService.postMessage(
            'As cartas não correspondem. Tente novamente.'
          );
        }, 300);
      }, 700);

      return;
    }

    this.playNotification('correct-answer');
    setTimeout(() => {
      this.screenReaderAnnouncerService.postMessage('Par encontrado!');
    }, 300);

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
      setTimeout(() => {
        new Audio((foundCard as CardWord).wordAudio).play();
      }, 300);
    }
  }

  isCardMatched(card: Card): boolean {
    return this.hits.includes(card.key);
  }

  isCardSelected(card: Card): boolean {
    return this.selectedCards.some(
      (it) => it.key === card.key && it.type === card.type
    );
  }

  getCardLabel(card: Card, index: number): string {
    const cardName = `Carta ${index + 1}`;

    if (this.isCardMatched(card)) {
      return `${cardName}: já virada. Par encontrado.`;
    }

    if (!this.isCardSelected(card)) {
      return `${cardName}: virada para baixo. Pressione Enter para virar.`;
    }

    if (card.type === 'word') {
      return `${cardName}: carta de áudio. Já está virada. Aguardando o par com imagem.`;
    }

    return `${cardName}: imagem de um(a) ${card.portuguese}. Já está virada. Aguardando o par com áudio.`;
  }
}
