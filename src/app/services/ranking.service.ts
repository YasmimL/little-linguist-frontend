import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GamesPoints } from '../models/games-points';

@Injectable({
  providedIn: 'root',
})
export class RankingService {
  private gamesUrl: string;

  constructor(private http: HttpClient) {
    this.gamesUrl = 'http://localhost:8080/games';
  }

  public get3BestUsers(
    gameName: string,
    nickName: string
  ): Observable<GamesPoints[]> {
    return this.http.get<GamesPoints[]>(
      `${this.gamesUrl}/${gameName}/${nickName}`
    );
  }

  public findByNickname(nickName: string): Observable<GamesPoints> {
    return this.http.get<GamesPoints>(`${this.gamesUrl}/${nickName}`);
  }

  public save(gamePoints: GamesPoints): Observable<GamesPoints> {
    return this.http.post<GamesPoints>(this.gamesUrl, gamePoints);
  }

  public update(
    gamePoints: GamesPoints,
    nickName: string
  ): Observable<GamesPoints> {
    return this.http.put<GamesPoints>(
      `${this.gamesUrl}/${nickName}`,
      gamePoints
    );
  }
}
