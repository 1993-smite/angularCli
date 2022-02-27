import { Injectable } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';
import {BehaviorSubject} from 'rxjs';
import {HttpCartService} from './http-cart.service';

export interface Cart{
  id?: string,
  name: string,
  date: NgbDate,
  price: number,
  description: string,
  status: number,
  active: boolean
}


@Injectable({
  providedIn: 'root'
})
export class CartService {

  items: Array<Cart> = [];
  public active: BehaviorSubject<Cart> = new BehaviorSubject({} as Cart);
  

  addToCart(cart: Cart) {

    let item = this.items.find(x=>x.id === cart.id);
    
    if (item){
      this.items.splice(this.items.indexOf(item),1, cart);
      //this.items.unshift(cart);
    }
    else{
      this.items.push(cart);
    }
  }

  setItems(carts: Array<Cart>) {
    this.items = carts;
  }

  getItems() {
    return this.items;
  }

  setActive(product: any){
    this.items.forEach(x=>x.active = false);
    product.active = true;
    this.active.next(product)
  }

  clearCart() {
    this.items = [];
    return this.items;
  }

}