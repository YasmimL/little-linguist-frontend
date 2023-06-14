import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnimalsActivityRegister } from '../models/animals-activity-register';

@Injectable({
  providedIn: 'root',
})
export class AnimalsActivitiesService {
  private gamesUrl: string;

  constructor(private http: HttpClient) {
    this.gamesUrl = 'http://localhost:8080/animals';
  }

  public findByNickname(nickName: string): Observable<AnimalsActivityRegister> {
    return this.http.get<AnimalsActivityRegister>(
      `${this.gamesUrl}/${nickName}`
    );
  }

  public save(
    animalsActivityRegister: AnimalsActivityRegister
  ): Observable<AnimalsActivityRegister> {
    return this.http.post<AnimalsActivityRegister>(
      this.gamesUrl,
      animalsActivityRegister
    );
  }

  public update(
    animalsActivityRegister: AnimalsActivityRegister,
    nickName: string
  ): Observable<AnimalsActivityRegister> {
    return this.http.put<AnimalsActivityRegister>(
      `${this.gamesUrl}/${nickName}`,
      animalsActivityRegister
    );
  }
}
