import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  currentUser: any;

  constructor(private _FireBaseHttp:HttpClient) { }

  // url = 'https://enamfirebase.firebaseio.com/products.json';     1).
  url = 'https://enamulgfb.firebaseio.com/product.json'            //2).
  postUrl ='https://enamulgfb.firebaseio.com/postUser.json'  //Using Post Method direct on ts File

  saveProduct(products:any[]){
    
    return this._FireBaseHttp.put(this.url,products)
  }
  fetchProduct(){
    return this._FireBaseHttp.get(this.url);
  }

}
