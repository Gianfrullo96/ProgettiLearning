import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { DecksComponent } from './decks/decks.component';
import { DeckListComponent } from './decks/deck-list/deck-list.component';
import { DeckDetailComponent } from './decks/deck-detail/deck-detail.component';
import { DeckEditComponent } from './decks/deck-edit/deck-edit.component';
import { DeckItemComponent } from './decks/deck-list/deck-item/deck-item.component';
import { DeckStartComponent } from './decks/deck-start/deck-start.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeckService } from './decks/deck.service';
import { DeckViewerComponent } from './decks/deck-viewer/deck-viewer.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { CardViewerComponent } from './decks/deck-viewer/card-viewer/card-viewer.component';
import { Scryfall } from './shared/scryfall.service';
import { HttpClientModule } from '@angular/common/http';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { HomeMenuComponent } from './shared/home-menu/home-menu.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DecksComponent,
    DeckListComponent,
    DeckDetailComponent,
    DeckEditComponent,
    DeckItemComponent,
    DeckStartComponent,
    DeckViewerComponent,
    DropdownDirective,
    CardViewerComponent,
    HomeMenuComponent
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AutocompleteLibModule
  ],
  providers: [DeckService, Scryfall],
  bootstrap: [AppComponent]
})
export class AppModule { }
