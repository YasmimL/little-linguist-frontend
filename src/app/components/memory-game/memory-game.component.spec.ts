import {
  ComponentFixture,
  TestBed,
  discardPeriodicTasks,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { GameStatus } from 'src/app/enum/game-status.enum';
import { Card } from 'src/app/models/card';
import { CardImage } from 'src/app/models/card-image';
import { CardWord } from 'src/app/models/card-word';
import { MemoryGameComponent } from './memory-game.component';

describe('MemoryGameComponent', () => {
  let component: MemoryGameComponent;
  let fixture: ComponentFixture<MemoryGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MemoryGameComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MemoryGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the gameStatus to INSTRUCTIONS and start the game after a delay', fakeAsync(() => {
    component.onClickStartGame();

    expect(component.gameStatus).toBe(GameStatus.INSTRUCTIONS);
  }));

  it('should start the game and update the game status and timer', fakeAsync(() => {
    component.startGame();

    expect(component.gameStatus).toBe(GameStatus.PLAYING);
    expect(component.time).toBe(120);
    tick(1000);

    expect(component.time).toBe(119);
    tick(10000);

    expect(component.time).toBe(109);

    discardPeriodicTasks();
  }));

  it('should finish the game and update the game status and result equal win', fakeAsync(() => {
    spyOn(component, 'finishGame');
    component.time = 120;
    component.startGame();

    tick(120000);

    expect(component.finishGame).toHaveBeenCalled();

    discardPeriodicTasks();
  }));

  it('should finish the game and update the game status and result equal lose', fakeAsync(() => {
    component.time = 120;
    component.hits = [];
    component.startGame();

    tick(120000);

    expect(component.gameResult?.result).toBe('lose');

    discardPeriodicTasks();
  }));

  it('should return true when card key is in hits array', () => {
    const card: Card = {
      type: 'image',
      key: 'dog',
      src: 'assets/images/dog.png',
    };
    component.hits = ['dog', 'cat', 'fish'];

    const result = component.shouldShowCard(card);

    expect(result).toBe(true);
  });

  it('should return true when card key and type match a card in selectedCards array', () => {
    const card: Card = {
      type: 'word',
      key: 'dog',
      word: 'Dog',
      wordAudio: 'assets/audio/dog.mp3',
    };
    component.selectedCards = [
      { type: 'image', key: 'cat', src: 'assets/images/cat.png' },
      {
        type: 'word',
        key: 'dog',
        word: 'Dog',
        wordAudio: 'assets/audio/dog.mp3',
      },
      { type: 'image', key: 'fish', src: 'assets/images/fish.png' },
    ];

    const result = component.shouldShowCard(card);

    expect(result).toBe(true);
  });

  it('should return early when card key is in hits array', () => {
    const card: Card = {
      type: 'image',
      key: 'dog',
      src: 'assets/images/dog.png',
    };
    component.hits = ['dog', 'cat', 'fish'];

    component.selectCard(card);

    expect(component.selectedCards.length).toBe(0);
  });

  it('should add the card to selectedCards array when it is the first selected card', () => {
    const card: Card = {
      type: 'word',
      key: 'dog',
      word: 'Dog',
      wordAudio: 'assets/audio/dog.mp3',
    };

    component.selectCard(card);

    expect(component.selectedCards.length).toBe(1);
    expect(component.selectedCards[0]).toBe(card);
  });

  it('should clear selectedCards array and return early when the two selected cards do not match', fakeAsync(() => {
    const cardOne: Card = {
      type: 'image',
      key: 'cat',
      src: 'assets/images/cat.png',
    };
    const cardTwo: Card = {
      type: 'word',
      key: 'dog',
      word: 'Dog',
      wordAudio: 'assets/audio/dog.mp3',
    };
    component.selectedCards = [cardOne];

    component.selectCard(cardTwo);

    tick(700);
    fixture.detectChanges();

    expect(component.selectedCards.length).toBe(0);
  }));

  it('should add the card key to hits array, clear selectedCards, and update gameStatus when all cards have been matched', fakeAsync(() => {
    const card: Card = {
      type: 'image',
      key: 'fish',
      src: 'assets/images/fish.png',
    };

    component.hits = ['dog', 'cat', 'owl', 'butterfly', 'cow'];

    component.selectedCards = [
      {
        type: 'word',
        key: 'fish',
        word: 'Fish',
        wordAudio: 'assets/audio/fish.mp3',
      },
    ];

    component.selectCard(card);

    expect(component.hits.length).toBe(6);
    expect(component.hits[5]).toBe(card.key);

    tick(800);
    expect(component.selectedCards.length).toBe(0);
    expect(component.gameStatus).toBe(GameStatus.FINISHED);
  }));

  it('should select and match cards', () => {
    const card1 = {
      type: 'image',
      key: 'dog',
      src: 'assets/images/dog.png',
    } as CardImage;
    const card2 = {
      type: 'word',
      key: 'dog',
      word: 'Dog',
      wordAudio: 'assets/audio/dog.mp3',
    } as CardWord;

    component.selectCard(card1);
    expect(component.selectedCards.length).toBe(1);

    component.selectCard(card2);
    expect(component.selectedCards.length).toBe(0);
    expect(component.hits.length).toBe(1);
  });

  it('should finish game when the number of hits is equal to the number of animals', fakeAsync(() => {
    component.animals = [
      { key: 'dog', word: 'Dog' },
      { key: 'cat', word: 'Cat' },
    ];
    component.hits = ['dog'];
    component.selectedCards = [
      { type: 'image', key: 'cat', src: 'assets/images/cat.png' },
    ];

    const card: Card = {
      type: 'word',
      key: 'cat',
      word: 'cat',
      wordAudio: 'assets/audio/cat.mp3',
    };

    component.selectCard(card);

    tick(800);
    fixture.detectChanges();

    expect(component.hits.length).toBe(2);
    expect(component.selectedCards.length).toBe(0);

    expect(component.gameStatus).toBe(GameStatus.FINISHED);
  }));

  it('should reset the game state when restartGame() is called', () => {
    component.time = 60;
    component.hits = ['dog'];
    component.selectedCards = [
      { key: 'cat', type: 'image', src: 'assets/images/cat.png' },
    ];
    component.gameResult = { result: 'win', score: 200 };

    component.restartGame();

    expect(component.time).toBe(120);
    expect(component.hits.length).toBe(0);
    expect(component.selectedCards.length).toBe(0);
    expect(component.gameResult).toBeNull();
  });
});
