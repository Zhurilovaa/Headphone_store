import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.less']
})
export class MainMenuComponent {

  @Input() count_product_of_busket: number = 0;
  @Input() count_product_of_favourite: number = 0;
  @Output() onClick = new EventEmitter();

}
