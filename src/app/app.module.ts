import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';


import { CartTableComponent } from './cart-table/cart.table.component';
import { CartComponent } from './cart/cart.component';

import { DateRuPipe } from './../pipes/date-ru.pipe';
import { NgbModule, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

import { NgbDateMomentParserFormatter } from './../formatters/NgbDateMomentParserFormatter';


@NgModule({
  declarations: [
    AppComponent,
    CartTableComponent,
    CartComponent,
    DateRuPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    NgbPaginationModule, 
    NgbAlertModule,
    HttpClientModule
  ],
  providers: [
    { 
      provide: NgbDateParserFormatter, 
      useFactory: () => { return new NgbDateMomentParserFormatter("DD.MM.YYYY") } 
    }
  ],
  bootstrap: [AppComponent, CartTableComponent, CartComponent]
})
export class AppModule { }
