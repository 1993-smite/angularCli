import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NgbDate, NgbCalendar, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import {switchMap} from 'rxjs/operators';

import { Cart, CartService } from '../services/cart.service';

import * as _ from 'lodash';
import { HttpCartService } from '../services/http-cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
    items;
    checkoutForm: FormGroup;
    
    modelDate: NgbDate | null;
    active: any;

    constructor(
      private cartService: CartService,
      private formBuilder: FormBuilder,
      private calendar: NgbCalendar, 
      private httpCart: HttpCartService,
      public formatter: NgbDateParserFormatter
    ) {
      this.items = this.cartService.getItems();
      this.modelDate = calendar.getToday();

      this.cartService.active.subscribe(cart => {
        this.selectActive(cart);
      })

      this.checkoutForm = this.formBuilder.group({});
      this.selectActive(undefined);
    }

    selectActive(cart: any){
      if (!cart){
        cart = {
          name: '',
          date: this.modelDate,
          price: 0,
          description: '',
          status: 1,
          active: true
        } as Cart;
      }
      this.active = cart;
    
      this.checkoutForm = this.formBuilder.group({
        id: cart.id,
        name: [cart.name, [Validators.required, Validators.pattern(/^[a-zA-Zа-яА-Я ]+$/)]],
        date: [cart.date as NgbDate, Validators.required],
        price: [cart.price, [Validators.required, Validators.min(1), Validators.pattern(/^[0-9]+(?!.)/)]],
        description: cart.description,
        active: cart.active,
        status: cart.status
      });
    }

    get _name() {
      return this.checkoutForm.get('name')
    }

    get _date() {
      return this.checkoutForm.get('date')
    }
  
    get _price() {
      return this.checkoutForm.get('price')
    }

    setActiveStatus(){
      this.active.status = this.active.status === 1 ? 9 : 1;
    }
   
    validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
      const parsed = this.formatter.parse(input);
      return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
    }

    newCart(){
      this.selectActive(undefined);
    }

    onClear(){
      this.checkoutForm.reset();
      this.active = { id: this.active.id };
      this.selectActive(this.active);
    }

    onSubmit(customerData: Cart) {
      // Process checkout data here
      console.log('Your order has been submitted', customerData, this.checkoutForm);

      if (!this.checkoutForm.valid){
        _.forEach(this.checkoutForm.controls, function(control: any, key: string) {
          control.touched = true;
        });
        return;
      }

      let cart: Cart = { ...customerData, active: false, status: this.active.status };

      if (cart.id){
        this.httpCart.update(cart).subscribe(() => {
          this.cartService.addToCart(cart);
          this.selectActive(undefined);
          //this.checkoutForm.reset();
        }, err => console.error(err))
      }
      else {
        this.httpCart.create(cart).subscribe(cart => {
          this.cartService.addToCart(cart);
          this.selectActive(undefined);
          //this.checkoutForm.reset();
        }, err => console.error(err))
      }
    }
}