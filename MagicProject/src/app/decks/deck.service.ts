import { Injectable } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs";
import { Card } from "../shared/card.model";
import { Deck } from "./deck.model";

@Injectable()
export class DeckService{
 
 public imgTevesh: string = 'https://www.cardtrader.com/uploads/blueprints/image/149769/show_cmr-512-tavesh-szat-doom-of-fools.jpg';
 public imgDargo: string = 'https://static.cardmarket.com/img/ca6881ade75bb6b163284b9964d3077e/items/1/CMR/510570.jpg';
 public imgVial: string = 'https://i.ebayimg.com/images/g/WBMAAOSw9Q9fuPmp/s-l300.jpg';
 public imgMalcolm: string = 'https://c1.scryfall.com/file/scryfall-cards/large/front/d/d/dd85fd88-7e5b-494a-9106-c78602604a1d.jpg?1612403847';
 public img1: string = 'https://c1.scryfall.com/file/scryfall-cards/large/front/4/4/4415d050-7a76-4f8b-bf78-e33dd21fe4f1.jpg?1562817335';
 public img2: string= 'https://c1.scryfall.com/file/scryfall-cards/large/front/5/7/579cce0c-5afe-4104-97e8-fd303e8fcc28.jpg?1645780893';


 deckChanged = new Subject<Deck[]>();
 cardChanged = new Subject<Card>();

 private decks: Deck[] = [
     new Deck(
         'Hundred ways to dia',
         'Rakdos',
         8,
         new Card('PrimoCommander',this.imgTevesh),
        new Card('PrimoPartner', this.imgDargo),
        [
         new Card('carta1', this.img1),
         new Card('carta2', this.img2)
        ]),

        new Deck(
            "Pirates 'n treasure",
            'Grixis',
            9,
            new Card('Commander2',this.imgMalcolm),
           new Card('Partner2',this.imgVial),
        [
            new Card('carta1',this.img2),
            new Card('carta2', this.img1)
        ]
        )
        ];

    constructor(){

    }
    setDecks(decks: Deck[]){
        this.decks= decks;
        this.deckChanged.next(this.decks.slice());
    }
    getDecks() {
        return this.decks.slice();
    }
    getDeck(index: number){
        return this.decks[index];
    }
    getDeckCard(index: number){
        return this.decks[index].cards;
    }


    // Verificare, non penso sia una buona procedura sostituire con una carta vuota, ma in questa maniera non ho errore dopo cancellazione
    deleteCommander(index: number){
        this.decks[index].commander = new Card('','');
        this.cardChanged.next(this.decks[index].commander);
    }
    deletePartner(index: number){
        this.decks[index].partner;
    }
    deleteSingleCard(indexDeck: number, indexCard: number){
        console.log(indexCard);
        console.log(this.decks[indexDeck].cards[indexCard]);
        this.decks[indexDeck].cards.splice(indexCard,1);
    }

    //update non agisce come dovrebbe
    updateDeck(index: number , newDeck: Deck){
        console.log(newDeck);
        console.log(this.decks[1]);
        this.decks[index]= newDeck;
        this.deckChanged.next(this.decks.slice());
    }

    deleteDeck(index: number){
        this.decks.splice(index, 1);
        this.deckChanged.next(this.decks.slice());
    }

    addDeck( deck: Deck){

        this.decks.push(deck);
        this.deckChanged.next(this.decks.slice())

    }

}