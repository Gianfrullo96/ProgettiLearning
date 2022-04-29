import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { DeckDetailComponent } from "./decks/deck-detail/deck-detail.component";
import { DeckEditComponent } from "./decks/deck-edit/deck-edit.component";
import { DeckStartComponent } from "./decks/deck-start/deck-start.component";
import { DeckViewerComponent } from "./decks/deck-viewer/deck-viewer.component";
import { DecksComponent } from "./decks/decks.component";


const appRoutes: Routes = [
    {path : '', redirectTo : '/decks', pathMatch :'full' },
    { path: 'decks', component: DecksComponent, children: [
         { path: '', component: DeckStartComponent },
        { path: 'new', component:  DeckEditComponent },
        { path: ':id', component: DeckDetailComponent},
        { path: ':id/view', component: DeckViewerComponent},
        { path: ':id/edit', component: DeckEditComponent }
    ]}
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}