import { Component, HostListener, OnInit } from '@angular/core';

import { Cart, CartService } from '../services/cart.service';
import { HttpCartService } from '../services/http-cart.service';

@Component({
  selector: 'app-cart-table',
  templateUrl: './cart.table.component.html'
})
export class CartTableComponent implements OnInit {
    items: Cart[] = [];
   
    constructor(
      private cartService: CartService,
      private httpCart: HttpCartService
    ) {
      this.items = this.cartService.getItems();

    }

    ngOnInit() {
      this.loadItems();
    }

    loadItems(){
      this.httpCart.load('1').subscribe(itms=>{
        this.cartService.setItems(itms);
        this.items = itms;
      });
    }

    @HostListener('document:keypress', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        console.log('document:keypress', event);
    }
  

    setActive(product: any){
      this.cartService.setActive(product);
    }

    setActiveIndex(index: number){
      console.log('setActiveIndex', index);
      // if (index <= 0)
      //   this.cartService.setActive(this.items[this.items.length-1]);
      // else if (index >= this.items.length) 
      //   this.cartService.setActive(this.items[0]);
      // else 
      //   this.cartService.setActive(this.items[index]);
    }

    getActive(){
      return this.items.find(x=>x.active);
    }

    isItems(): boolean{
        return this.items.length > 0;
    }

    isDate(field: any): boolean{
      return field instanceof Date;
    }
}