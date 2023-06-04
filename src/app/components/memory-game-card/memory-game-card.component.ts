import { Component, Input } from '@angular/core';
import { CardImage } from 'src/app/models/card-image';
import { CardWord } from 'src/app/models/card-word';

@Component({
  selector: 'app-memory-game-card',
  templateUrl: './memory-game-card.component.html',
  styleUrls: ['./memory-game-card.component.scss'],
})
export class MemoryGameCardComponent {
  @Input() card?: CardImage | CardWord;
  @Input() cardSelected = false;
}
