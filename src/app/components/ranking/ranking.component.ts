import { Component } from '@angular/core';
import { GamesPoints } from 'src/app/models/games-points';
import { RankingService } from 'src/app/services/ranking.service';
import { UserDataService } from 'src/app/services/user.data.service';

type Columns =
  | 'cardGamePoints'
  | 'memoryGamePoints'
  | 'hangmanGamePoints'
  | 'puzzleGamePoints';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss'],
})
export class RankingComponent {
  gameMapping: { [key: string]: string } = {
    cardGame: 'cardGamePoints',
    memoryGame: 'memoryGamePoints',
    hangmanGame: 'hangmanGamePoints',
    puzzleGame: 'puzzleGamePoints',
  };
  ranking?: GamesPoints[];
  userScore?: GamesPoints;
  columnName?: Columns;

  constructor(
    private userDataService: UserDataService,
    private rankingService: RankingService
  ) {
    this.userDataService.refreshRanking.subscribe((gameName) => {
      this.refreshRanking(gameName);
    });
  }

  refreshRanking(gameName: string): void {
    if (this.userDataService.user) {
      const { nickname } = this.userDataService.user;
      this.columnName = this.gameMapping[gameName] as Columns;
      this.rankingService
        .get3BestUsersAndCurrentUser(this.columnName, nickname)
        .subscribe((result) => {
          const [first, second, third, userScore] = result;
          this.ranking = [first, second, third];
          this.userScore = userScore;
        });
    }
  }

  userClassification(position: 0 | 1 | 2): string {
    if (!this.ranking || !this.columnName) return '';

    const userScore = this.ranking[position];
    if (!userScore) return '';

    const score = userScore[this.columnName];

    let classification = '';
    switch (position) {
      case 0:
        classification = 'Primeiro';
        break;
      case 1:
        classification = 'Segundo';
        break;
      case 2:
        classification = 'Terceiro';
        break;
    }

    return `${classification} lugar: ${userScore.nickname} com ${score} pontos`;
  }

  currentUserClassification(userScore: GamesPoints): string {
    if (!this.columnName) return '';

    const { nickname, classification } = userScore;
    const score = userScore[this.columnName];

    return `${nickname}, você ficou na posição ${classification}, sua pontuação foi de ${score} pontos`;
  }
}
