import { User } from './user';

export class AnimalsActivityRegister {
  constructor(
    public nickname: string,
    public totalStars: number,
    public latestActivityUnlocked: number,
    public starsInFirstActivity: number,
    public starsInSecondActivity: number,
    public starsInThirdActivity: number,
    public user: User
  ) {}
}
