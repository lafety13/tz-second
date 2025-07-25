import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-board-toolbar',
  imports: [],
  templateUrl: './board-toolbar.component.html',
  styleUrl: './board-toolbar.component.scss'
})
export class BoardToolbarComponent {
  @Output() createProject = new EventEmitter();
}
