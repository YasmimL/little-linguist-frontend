import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
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
      forkJoin({
        ranking: this.rankingService.get3BestUsers(this.columnName, nickname),
        userScore: this.rankingService.findByNickname(nickname),
      }).subscribe(({ ranking, userScore }) => {
        this.ranking = ranking;
        this.userScore = userScore;
      });
    }
  }
}
