import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Cart } from './cart.service';

export interface CreateResponse {
  name: string
}

@Injectable({
  providedIn: 'root'
})
export class HttpCartService {
  static url = 'https://angulardb-ae70b-default-rtdb.firebaseio.com'

  constructor(private http: HttpClient) {
  }

  load(filter: string): Observable<Cart[]> {
    return this.http
      .get<any>(`${HttpCartService.url}/state-${filter}.json`)
      .pipe(map(carts => {
        if (!carts) {
          return []
        }
        return Object.keys(carts).map(key => ({...carts[key], id: key}))
      }))
  }

  loadOne(cart: Cart): Observable<Cart> {
    return this.http
      .get<any>(`${HttpCartService.url}/state-${cart.status}/${cart.id}.json`)
      .pipe(map(carts => {
        if (!carts) {
          return {}
        }
        return Object.keys(carts).map(key => ({...carts[key], id: key})).find(x=>x.id === cart.id)
      }))
  }

  create(cart: Cart): Observable<Cart> {
    return this.http
      .post<CreateResponse>(`${HttpCartService.url}/state-${cart.status}.json`, cart)
      .pipe(map(res => {
        return {...cart, id: res.name}
      }))
  }

  gt(): any {
    
    let dt = this.http.get('https://metanit.com/sharp/')
    .pipe(val => {
      console.log(val);
      return val;
    });

    return dt
  }

  update(cart: Cart): Observable<void> {
    return this.http
      .put<void>(`${HttpCartService.url}/state-${cart.status}/${cart.id}.json`, cart);
  }

  remove(cart: Cart): Observable<void> {
    return this.http
      .delete<void>(`${HttpCartService.url}/state-${cart.status}/${cart.id}.json`)
  }

}
