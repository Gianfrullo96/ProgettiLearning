import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Deck } from '../deck.model';
import { DeckService } from '../deck.service';

@Component({
  selector: 'app-deck-list',
  templateUrl: './deck-list.component.html',
  styleUrls: ['./deck-list.component.css']
})
export class DeckListComponent implements OnInit, OnDestroy{

  decks: Deck[];
  subscription: Subscription;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private DeckService: DeckService

     ) { }
  ngOnDestroy(): void {
   this.subscription.unsubscribe;
  }
 
 
  onNewDeck() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
   //service che fa get
   ngOnInit(): void {
    this.decks = this.DeckService.getDecks();
    this.subscription = this.DeckService.deckChanged.subscribe(
      (decks: Deck[]) => {
        this.decks= decks;
      }
    )
  }

}
