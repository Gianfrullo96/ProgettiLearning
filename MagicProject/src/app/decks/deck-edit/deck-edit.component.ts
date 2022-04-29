import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Card } from 'src/app/shared/card.model';
import { Scryfall } from 'src/app/shared/scryfall.service';
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
  scryfallName: string;
  scryfallImg: string;
  imgFetchScry: string;
  autocompleteData: string[] ;
  autocompleteDataInline: string[];
  //in esempio keyword è parametro dell' oggetto (name) nel mio caso il ritorno sono stringhe e non array di oggetti
  keyword : 'TODO'
  
  

  constructor(
    private route: ActivatedRoute,
    private deckService: DeckService,
    private router: Router,
    private scryfallService: Scryfall
  ) {}
  //se è  arrivato un id siamo in edit mode, altrimenti in creazione
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
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
    return  (this.deckForm.get('partner') as FormArray).controls;
}
get commanderControls() {
  return  (this.deckForm.get('commander') as FormArray).controls;
}
get cardsControls() {
  return  (this.deckForm.get('cards') as FormArray).controls;
}

onDeleteCard(index: number) {
  (<FormArray>this.deckForm.get('cards')).removeAt(index);
}
onDeleteCommander(index: number) {
  (<FormArray>this.deckForm.get('commander')).removeAt(index);
}
onDeletePartner(index: number) {
  (<FormArray>this.deckForm.get('partner')).removeAt(index);
}
onAddCard() {
  (<FormArray>this.deckForm.get('cards')).push(
    new FormGroup({
      'cardName': new FormControl(null, Validators.required),
      'cardImg': new FormControl(null,Validators.required)
    })
  );
}
onAddPartner() {
  (<FormArray>this.deckForm.get('partner')).push(
    new FormGroup({
      'partnerName': new FormControl(null, Validators.required),
      'partnerImg': new FormControl(null,Validators.required)
    })
  );
}
onAddCommander() {
  (<FormArray>this.deckForm.get('commander')).push(
    new FormGroup({
      'commanderName': new FormControl(null, Validators.required),
      'commanderImg': new FormControl(null,Validators.required)
    })
  );
}

initForm() {
  let deckName = '';
  let deckColor= '';
  let deckPowerLevel = 0;
  let deckCommander = new FormArray([]);
  let deckPartner = new FormArray([]);
  let deckCards = new FormArray([]);


  if (this.editMode) {
    const deck = this.deckService.getDeck(this.id);
    deckName = deck.name;
    deckColor= deck.manaColor;
    deckPowerLevel=  deck.powerLevel;
    
    
    if (deck['cards']) {
      for (let card of deck.cards) {
        deckCards.push(
          new FormGroup({
            'cardName': new FormControl(card.name, Validators.required),
            'cardImg': new FormControl(card.img,Validators.required)
          })
        );
      }
    }
    if(deck['commander']){
      deckCommander.push(
        new FormGroup({
          'commanderName':new FormControl(deck.commander.name, Validators.required),
          'commanderImg':new FormControl(deck.commander.img, Validators.required)
        })
      )
    }
    if(deck['partner']){
      deckPartner.push(
        new FormGroup({
          'partnerName':new FormControl(deck.partner.name, Validators.required),
          'partnerImg':new FormControl(deck.partner.img, Validators.required)
        })
      )
    }
}
this.deckForm = new FormGroup({
  'name': new FormControl(deckName, Validators.required),
  'manaColor': new FormControl(deckColor, Validators.required),
  'powerLevel': new FormControl(deckPowerLevel, Validators.required),
  'commander':deckCommander,
  'partner': deckPartner,
  'cards': deckCards
  
});
}

//ricerca Scryfall
onFetchCard( name: string){
 this.scryfallService.fetchCards(name).subscribe(
  (data : any) => {
    this.scryfallName= data.name;
    this.scryfallImg= data.image_uris.art_crop;
  } 
 )
}

onFetchAutocomplete(name: string){
 this.scryfallService.fetchCardsAutoComplete(name).subscribe(
   (data: any) => {
   this.autocompleteData = data.data;
    this.autocompleteDataInline= data.data;
   }
 )
}


seeDetails(data: string){
  this.onFetchCard(data);
}

addToList(cardname: string){
  let provaImg= '';
  const deck = this.deckService.getDeck(this.id);
   this.scryfallService.fetchCardImg(cardname).subscribe(
     (data: any) => {
       provaImg = data.image_uris.art_crop;
       let newCard =  new Card(cardname,provaImg);
       deck.cards.push(newCard);
       this.deckService.updateDeck(this.id,deck);
       
     }
   );
}




//Comandi per autocomplete 
selectEvent(item) {
  this.scryfallService.fetchCardImg(item).subscribe(
    (data: any) => {
      console.log('Dati sul select Event');
      console.log(data.name);
      console.log(data.image_uris.art_crop);
    }
  )
}


//TODO: Provare async / Await
onChangeSearch(val: string) {
  
   this.onFetchAutocomplete(val);
  
}

onFocused(e){
 console.log("i'm focused");
}
}
