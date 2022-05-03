import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Card } from 'src/app/shared/card.model';
import { Scryfall } from 'src/app/shared/scryfall.service';
import { Deck } from '../deck.model';
import { DeckService } from '../deck.service';

@Component({
  selector: 'app-deck-edit',
  templateUrl: './deck-edit.component.html',
  styleUrls: ['./deck-edit.component.css']
})
export class DeckEditComponent implements OnInit {
  id: number;
  editMode = false;
  deckForm: FormGroup;

  //prova fetch scarso
  scryfallName: string;
  scryfallImg: string;

  //Rework form
  commanderCard: Card = { name: '', img: '' };
  partnerCard: Card = { name: '', img: '' };
  deckListCards: Card[];

  //Prova Scorrimento
  cardListImage: string;
  indexList: number = 0;
  cardListScroll: Card[];
  newCardPressed: boolean = false;
  autocompleteDataInline: string[];
  cardFromAutocomplete: Card;
  imgCardAuto: string;


  imgFetchScry: string;
  autocompleteData: string[];
  

  deckChanged = new Subject<Deck>();
  //in esempio keyword è parametro dell' oggetto (name) nel mio caso il ritorno sono stringhe e non array di oggetti
  keyword: 'TODO'



  constructor(
    private route: ActivatedRoute,
    private deckService: DeckService,
    private router: Router,
    private scryfallService: Scryfall
  ) { }
  //se è  arrivato un id siamo in edit mode, altrimenti in creazione
  ngOnInit() {

    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.loadInfo();
      this.initForm();
      this.loadListofCards();
    });
  }

  onSubmit() {

    if (this.editMode) {

      console.log(this.deckForm.value);
      this.deckService.updateDeck(this.id, this.deckForm.value);
    } else {
      this.deckService.addDeck(this.deckForm.value);

    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  get partnerControls() {
    return (this.deckForm.get('partner') as FormArray).controls;
  }
  get commanderControls() {
    return (this.deckForm.get('commander') as FormArray).controls;
  }
  get cardsControls() {
    return (this.deckForm.get('cards') as FormArray).controls;
  }

  // See details

  onSeeDetailsCommander(name: string) {
    this.seeCardDetails(name);
  }
  onSeeDetailsPartner(name: string) {
    this.seeCardDetails(name);
  }
  seeCardDetails(name: string) {
    console.log(name);
    //TODO 
  }







  //modificare che quando cancello si cancelli anche il dom( scompaia il campo )
  onDeleteCard(index: number) {
    this.deckService.deleteSingleCard(this.id, index);
  }
  onDeleteCommander() {
    console.log('pressed');
    this.deckService.deleteCommander(this.id);
    this.deckService.cardChanged.subscribe(value => {
      console.log(value);
      this.commanderCard = value;
    })
  }
  onDeletePartner() {
    this.deckService.deletePartner(this.id);
  }
  onAddCard() {
   //TODO : fatto in add card to list 
  }
  onAddPartner() {
   //TODO
  }
  onAddCommander() {
  //TODO
  }
  loadInfo() {
    if (this.editMode) {
      let deck = this.deckService.getDeck(this.id);
      this.commanderCard = deck.commander;
      this.partnerCard = deck.partner;
      this.deckListCards = deck.cards;
    } else {
      console.log('Non sono in edit mode alt!!!')
    }
  }

  initForm() {
    let deckName = '';
    let deckColor = '';
    let deckPowerLevel = 0;

    if (this.editMode) {
      const deck = this.deckService.getDeck(this.id);
      deckName = deck.name;
      deckColor = deck.manaColor;
      deckPowerLevel = deck.powerLevel;

    }
    this.deckForm = new FormGroup({
      'name': new FormControl(deckName, Validators.required),
      'manaColor': new FormControl(deckColor, Validators.required),
      'powerLevel': new FormControl(deckPowerLevel, Validators.required)
    });
  }

  //ricerca Scryfall
  onFetchCard(name: string) {
    this.scryfallService.fetchCards(name).subscribe(
      (data: any) => {
        this.scryfallName = data.name;
        this.scryfallImg = data.image_uris.art_crop;
      }
    )
  }

  onFetchAutocomplete(name: string) {
    this.scryfallService.fetchCardsAutoComplete(name).subscribe(
      (data: any) => {
        //finto autocomplete
        this.autocompleteData = data.data;
        //autocomplete
        this.autocompleteDataInline = data.data;
      }
    )
  }


  seeDetails(data: string) {
    this.onFetchCard(data);
  }

  addToList(cardname: string) {
    let provaImg = '';
    const deck = this.deckService.getDeck(this.id);
    this.scryfallService.fetchCardImg(cardname).subscribe(
      (data: any) => {
        provaImg = data.image_uris.art_crop;
        let newCard = new Card(cardname, provaImg);
        deck.cards.push(newCard);
        this.deckService.updateDeck(this.id, deck);
      }
    );
  }


  //Comandi per autocomplete 
  selectEvent(item) {

    this.scryfallService.fetchCard(item).subscribe(
      (value : any) => {
        this.imgCardAuto=value.image_uris.normal;
        
        this.cardFromAutocomplete= new Card(item,this.imgCardAuto);
        console.log(this.cardFromAutocomplete);
      }
    );
  }
  //Aggiungere carta a lista
  addCardToList(){
    const deck = this.deckService.getDeck(this.id);
    deck.cards.push(this.cardFromAutocomplete);
    this.deckService.updateDeck(this.id, deck);
    this.deckChanged.next(deck);
  }


  //TODO: Provare async / Await
  onChangeSearch(val: string) {
    this.onFetchAutocomplete(val);
  }
  onFocused(e) {
    console.log("i'm focused");
  }
  //Proviamo Scorrimento immagini
  loadListofCards() {
    let deck = this.deckService.getDeck(this.id);
    this.cardListScroll = deck.cards;

    this.cardListImage = this.cardListScroll[this.indexList].img;
  }
  scroll(direction: string) {
    let cardListLenght = this.cardListScroll.length;
    if (direction === 'left' && this.indexList !== 0) {
      console.log(this.indexList);
      this.indexList = --this.indexList;
      this.cardListImage = this.cardListScroll[this.indexList].img;
      console.log(this.indexList);
    }
    if (direction === 'left' && this.indexList === 0) {
      console.log("Disattiva pulsante sinistra");
    }
    if (direction === 'right' && this.indexList !== cardListLenght) {
      console.log(this.indexList);
      this.indexList = ++this.indexList;
      this.cardListImage = this.cardListScroll[this.indexList].img;
      console.log(this.indexList);
    }
    if (direction === 'right' && this.indexList === cardListLenght) {
      console.log("Disattiva pulsante sinistra");
    }
  }
  addNewCardToList() {
    this.newCardPressed = true;
  }

}
