import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Activity } from 'src/app/models/activity';
import { AnimalsActivityRegister } from 'src/app/models/animals-activity-register';
import { ActivitiesDataService } from 'src/app/services/activities.data.service';
import { AnimalsActivitiesService } from 'src/app/services/animals-activities.service';
import { ScreenReaderAnnouncerService } from 'src/app/services/screen-reader-announcer.service';
import { UserDataService } from 'src/app/services/user.data.service';
import { focusElement } from 'src/app/utils/focus-element';

interface ActivityResult {
  result: 'win' | 'lose';
  totalHits: number;
}

@Component({
  selector: 'app-activity-exercise',
  templateUrl: './activity-exercise.component.html',
  styleUrls: ['./activity-exercise.component.scss'],
})
export class ActivityExerciseComponent implements OnInit {
  activities = [{ number: 1 }, { number: 2 }, { number: 3 }];
  current: number = -1;
  currentQuestion: number = 0;
  hits: number = 0;
  activityResult?: ActivityResult | null = null;
  animalsActivityRegister!: AnimalsActivityRegister;
  activity?: Activity;
  wordGrabbed: boolean = false;

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

  get hitsByActivity() {
    return this.activitiesDataService.hitsByActivity;
  }

  get totalAnswered() {
    return Object.keys(this.answers).filter((it) => this.answers[it]).length;
  }

  get totalQuestions() {
    return Object.keys(this.answersheet).length;
  }

  constructor(
    private animalsActivitiesService: AnimalsActivitiesService,
    private userDataService: UserDataService,
    private activitiesDataService: ActivitiesDataService,
    private activatedRoute: ActivatedRoute,
    private screenReaderAnnouncerService: ScreenReaderAnnouncerService
  ) {}

  @HostListener('document:keydown.escape', ['$event'])
  onEscapePress(event: KeyboardEvent) {
    if (this.wordGrabbed) {
      this.wordGrabbed = false;
      this.screenReaderAnnouncerService.postMessage('Movimento cancelado.');
    }
  }

  ngOnInit(): void {
    this.getRouteKey();
    this.findActivityDataByNickname();
  }

  getRouteKey(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const keyActivity = params.get('key');

      this.activity = this.activitiesDataService.activities.find(
        (activity) => activity.key === keyActivity
      );
    });
  }

  focusQuestionStatement(timeout: number = 200) {
    setTimeout(() => {
      focusElement(() =>
        document.querySelector('.selected-question .question-statement')
      );
    }, timeout);
  }

  selectActivity(index: number): void {
    this.current = index;

    this.screenReaderAnnouncerService.postMessage(
      `Atividade ${this.current + 1} selecionada`
    );

    const exerciseContainer = document.querySelector('.exercise-container');

    if (exerciseContainer) {
      const scrollIntoExerciseContainer = () =>
        exerciseContainer.scrollIntoView({
          behavior: 'smooth',
        });

      setTimeout(scrollIntoExerciseContainer, 200);
      this.focusQuestionStatement();
    }
  }

  next(): void {
    if (this.currentQuestion !== 3) {
      this.currentQuestion++;
      this.focusQuestionStatement();
    }
  }

  previous(): void {
    if (this.currentQuestion > 0) {
      this.currentQuestion--;
      this.focusQuestionStatement();
    }
  }

  selectAlternative(answer: string): void {
    const giveFeedback = (correct: boolean = true) => {
      const message = `Resposta ${correct ? 'certa' : 'errada'}`;
      setTimeout(
        () => this.screenReaderAnnouncerService.postMessage(message),
        500
      );
    };

    const correctAnswer = this.answersheet[this.currentQuestion];
    this.answers[this.currentQuestion] = {
      answer,
      correct: answer === correctAnswer,
    };

    if (this.answers[this.currentQuestion]?.correct) {
      this.playNotification('correct-answer');
      this.hits = this.hits + 1;
      giveFeedback();
    } else {
      this.playNotification('wrong-answer');
      giveFeedback(false);
    }

    if (this.totalAnswered === this.totalQuestions) {
      this.finishActivity();
    } else {
      setTimeout(() => {
        focusElement(() => document.querySelector('.next-question'));
      }, 1000);
    }
  }

  finishActivity(): void {
    const activityResult: ActivityResult = {
      result: this.hits > 0 ? 'win' : 'lose',
      totalHits: this.hits,
    };

    this.updateActivityData();

    setTimeout(() => {
      if (activityResult.result === 'win') {
        this.playNotification('congratulations');
        setTimeout(() => {
          this.screenReaderAnnouncerService.postMessage(
            'Parabéns! Você conseguiu finalizar essa fase de atividades!'
          );
        }, 5000);
      } else {
        this.playNotification('game-over');
        setTimeout(() => {
          this.screenReaderAnnouncerService.postMessage(
            'Não foi desta vez! Vamos lá, não desista e tente novamente!'
          );
        }, 5000);
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

    this.focusQuestionStatement();
  }

  closeActivity(): void {
    this.restartActivity();
    this.current = -1;
  }

  updateActivityData(): void {
    if (this.userDataService.user) {
      const { nickname } = this.userDataService.user;

      this.animalsActivityRegister = new AnimalsActivityRegister(
        nickname,
        this.hits,
        1,
        this.hits,
        0,
        0,
        this.userDataService.user
      );

      this.animalsActivitiesService
        .update(this.animalsActivityRegister, nickname)
        .subscribe(() => {
          this.findActivityDataByNickname();
        });
    }
  }

  findActivityDataByNickname(): void {
    if (this.userDataService.user) {
      const { nickname } = this.userDataService.user;

      this.animalsActivitiesService
        .findByNickname(nickname)
        .subscribe((activity) => {
          this.activitiesDataService.hitsByActivity[0] =
            activity.starsInFirstActivity;
        });
    }
  }

  grabWord() {
    this.wordGrabbed = !this.wordGrabbed;
    if (this.wordGrabbed) {
      this.screenReaderAnnouncerService.postMessage(
        'A palavra foi selecionada para mover. Vá até o destino e pressione Enter para soltar.'
      );
    } else {
      this.screenReaderAnnouncerService.postMessage('Movimento cancelado.');
    }
  }

  selectWord(option: string) {
    if (!this.wordGrabbed) return;
    this.selectAlternative(option);
    this.wordGrabbed = false;
  }

  onConfettiFinished(): void {
    setTimeout(() => {
      focusElement(() => document.querySelector('.restart-button'));
    });
  }
}
