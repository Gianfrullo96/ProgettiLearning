import { Component, Input, OnInit } from '@angular/core';
import { Card } from 'src/app/shared/card.model';

@Component({
  selector: 'app-card-viewer',
  templateUrl: './card-viewer.component.html',
  styleUrls: ['./card-viewer.component.css']
})
export class CardViewerComponent implements OnInit {
 @Input() cardList: Card[];
 @Input() card: Card;
 @Input() index: number;
  constructor() { }

  ngOnInit(): void {
  }

}
