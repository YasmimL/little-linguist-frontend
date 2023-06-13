import { Component } from '@angular/core';

interface ActivityResult {
  result: 'win' | 'lose';
  totalHits: number;
}

@Component({
  selector: 'app-activity-exercise',
  templateUrl: './activity-exercise.component.html',
  styleUrls: ['./activity-exercise.component.scss'],
})
export class ActivityExerciseComponent {
  activities = [{ number: 1 }, { number: 2 }, { number: 3 }];
  current: number = -1;
  currentQuestion: number = 0;
  hits: number = 0;
  activityResult?: ActivityResult | null = null;

  answersheet: {
    [question: string]: string;
  } = {
    0: 'right',
    1: 'vaca',
    2: 'butterfly',
  };

  answers: {
    [question: string]: { answer: string; correct: boolean } | undefined;
  } = {
    0: undefined,
    1: undefined,
    2: undefined,
  };

  get totalAnswered() {
    return Object.keys(this.answers).filter((it) => this.answers[it]).length;
  }

  get totalQuestions() {
    return Object.keys(this.answersheet).length;
  }

  constructor() {}

  selectActivity(index: number): void {
    this.current = index;

    setTimeout(() => {
      document
        .querySelector('.activities-category-container')
        ?.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  }

  next(): void {
    if (this.currentQuestion !== 3) {
      this.currentQuestion++;
    }
  }

  previous(): void {
    if (this.currentQuestion > 0) {
      this.currentQuestion--;
    }
  }

  selectAlternative(answer: string): void {
    const correctAnswer = this.answersheet[this.currentQuestion];
    this.answers[this.currentQuestion] = {
      answer,
      correct: answer === correctAnswer,
    };

    if (this.answers[this.currentQuestion]?.correct) {
      this.playNotification('correct-answer');
      this.hits = this.hits + 1;
    } else {
      this.playNotification('wrong-answer');
    }

    if (this.totalAnswered === this.totalQuestions) {
      this.finishActivity();
    }
  }

  finishActivity(): void {
    const activityResult: ActivityResult = {
      result: this.hits > 0 ? 'win' : 'lose',
      totalHits: this.hits,
    };

    setTimeout(() => {
      if (activityResult.result === 'win') {
        this.playNotification('congratulations');
      } else {
        this.playNotification('game-over');
      }
      this.activityResult = activityResult;
    }, 1000);
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

  onPlayAudio(key: string): void {
    new Audio(`assets/audio/${key}.m4a`).play();
  }

  allowDrop(event: Event) {
    event.preventDefault();
  }

  onDrop(event: Event, option: string) {
    event.preventDefault();
    this.selectAlternative(option);
  }

  startDrag(event: Event) {
    setTimeout(() => {
      if (event.target) {
        (event.target as HTMLElement).style.visibility = 'hidden';
      }
    }, 0);
  }

  endDrag(event: Event) {
    if (event.target) {
      (event.target as HTMLElement).style.visibility = 'visible';
    }
  }

  restartActivity(): void {
    this.hits = 0;
    this.currentQuestion = 0;
    this.activityResult = null;
    this.answers = {
      0: undefined,
      1: undefined,
      2: undefined,
    };
  }

  closeActivity(): void {
    // this.current = 0;
  }
}
