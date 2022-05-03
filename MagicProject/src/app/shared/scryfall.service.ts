import { Injectable } from "@angular/core";
import { DeckService } from "../decks/deck.service";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Card } from "./card.model";
import { map, tap } from "rxjs/operators";
import { Observable, Subject, Subscription } from "rxjs";

@Injectable({ providedIn: 'root'})
export class Scryfall{

public returnData: Card[];
public testDataObj = [];

 constructor(
     private http: HttpClient,
     private deckService: DeckService,
 ){}
 

 /*fetchCards(name: string){
    console.log('ci ho provato');
     let returndata1 = this.http.get<Card[]>(
         'https://api.scryfall.com/cards/named?fuzzy='+name
     )
     .pipe(
         map(
          cards => {
             return cards.map(card => {
                 return{
                     
                     ...card
                 };
             });
         })
     )
     console.log(returndata1);
     returndata1.subscribe((data)=>console.log('Dati ricevuti dal subscribe'+ data));
 }*/



 fetchCards(name: string){
    let url= 'https://api.scryfall.com/cards/named?fuzzy=';
    console.log('url: ' + url + name)
    return this.http.get(url + name);

}
fetchCardsAutoComplete(name: string){
//cambiare e emettere link vcorretto
    let url= 'https://api.scryfall.com/cards/autocomplete?q=';
    console.log('url Autocomplete: ' + url + name)
    return this.http.get(url + name);

}
fetchCardImg(name:string){
    let url= 'https://api.scryfall.com/cards/named?fuzzy=';
    return this.http.get(url + name);
}
fetchCard(name:string){
    let url= 'https://api.scryfall.com/cards/named?exact=';
    return this.http.get(url + name);
}
}