import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  user?: User;
  refreshRanking = new EventEmitter<string>();
}
