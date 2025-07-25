import {Component, Input} from '@angular/core';
import {ProjectCard} from '../../interfaces/card.interface';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() card!: ProjectCard;
}
