import { Word } from './word';

export interface Activity {
  key: string;
  englishName: string;
  portugueseName: string;
  src: string;
  width: string;
  words: Word[];
}
