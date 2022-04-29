import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Card } from 'src/app/shared/card.model';
import { Deck } from '../deck.model';
import { DeckService } from '../deck.service';

@Component({
  selector: 'app-deck-viewer',
  templateUrl: './deck-viewer.component.html',
  styleUrls: ['./deck-viewer.component.css']
})
export class DeckViewerComponent implements OnInit {
  deck: Deck;
  id: number;
  cardList: Card[];
  card: Card;

  

constructor(private deckService: DeckService, private router: Router, private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.deck= this.deckService.getDeck(this.id);
        this.cardList= this.deck.cards;
      }
    );
  }
  

}
