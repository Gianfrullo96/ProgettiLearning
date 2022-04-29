import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Deck } from "../decks/deck.model";
import { DeckService } from "../decks/deck.service";

@Injectable({ providedIn: 'root'})
export class DataStorageService{
    constructor(
        private http: HttpClient,
        private deckService: DeckService
      ) {}
      storeDecks(){
          const decks= this.deckService.getDecks();
          this.http.put('https://magicproject-9ec20-default-rtdb.firebaseio.com/decks.json', decks).subscribe(response => {
              console.log(response);

          })
      }
      fetchDecks(){
        this.http.get<Deck[]>('https://magicproject-9ec20-default-rtdb.firebaseio.com/decks.json').subscribe(
            decks => {
               this.deckService.setDecks(decks);
            }
        );
      }
}