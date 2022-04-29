import { Component, Input, OnInit } from '@angular/core';
import { Deck } from '../../deck.model';

@Component({
  selector: 'app-deck-item',
  templateUrl: './deck-item.component.html',
  styleUrls: ['./deck-item.component.css']
})
export class DeckItemComponent implements OnInit {

  @Input() deck: Deck;
  @Input() index: number;

  ngOnInit(): void {
  }

  

}
