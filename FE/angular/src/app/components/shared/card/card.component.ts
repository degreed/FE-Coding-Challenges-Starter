import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MovieComplete } from 'src/app/models';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() public movie: MovieComplete;
  @Input() public buttonText: string;
  @Output() public buttonClick = new EventEmitter<string>();
  navigateTo(id: string) {
    this.buttonClick.emit(id);
  }
}
