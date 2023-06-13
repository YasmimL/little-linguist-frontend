import { User } from './user';

export class GamesPoints {
  constructor(
    public nickname: string,
    public cardGamePoints: number,
    public memoryGamePoints: number,
    public hangmanGamePoints: number,
    public puzzleGamePoints: number,
    public user: User,
    public classification?: number
  ) {}
}
