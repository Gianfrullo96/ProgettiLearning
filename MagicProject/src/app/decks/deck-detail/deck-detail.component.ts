import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Deck } from '../deck.model';
import { DeckService } from '../deck.service';

@Component({
  selector: 'app-deck-detail',
  templateUrl: './deck-detail.component.html',
  styleUrls: ['./deck-detail.component.css']
})
export class DeckDetailComponent implements OnInit {
  deck: Deck;
  id: number;

  constructor(private deckService: DeckService, private router: Router, private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.deck= this.deckService.getDeck(this.id);
      }
    );
  }
 
  onEditDeck() {
    console.log('proviamo ad editare');
    this.router.navigate(['edit'], {relativeTo: this.route});
  }
  onSeeDeck() {
    console.log('pressed see deck');
    this.router.navigate(['view'],{relativeTo: this.route})
  }
  onDeleteDeck() {
    console.log('cancellato il deck con id='+ this.id);
    this.deckService.deleteDeck(this.id);
    this.router.navigate(['/decks']);
  }

}
