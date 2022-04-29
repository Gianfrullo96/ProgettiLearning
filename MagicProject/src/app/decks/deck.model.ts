import { Card } from "../shared/card.model";

export class Deck{
    public name: string;
    public manaColor: string;
    public powerLevel: number;
    public commander: Card;
    public partner: Card;
    public cards: Card[];
  

    constructor(name: string, manaC: string, pL: number,  commander: Card, partner: Card, cards: Card[]) {
        this. name= name;
        this.manaColor= manaC;
        this.powerLevel = pL;
        this.commander = commander;
        this.partner= partner;
        this.cards= cards;
    }

}