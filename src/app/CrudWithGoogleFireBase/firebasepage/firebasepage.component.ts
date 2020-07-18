import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FirebaseService } from '../firebase.service';



@Component({
  selector: 'app-firebasepage',
  templateUrl: './firebasepage.component.html',
  styleUrls: ['./firebasepage.component.css']
})
export class FirebasepageComponent implements OnInit {
  fetching:boolean = false;
  IsEdit:boolean = false;
  EditIndex:number;
  @ViewChild('id') id:ElementRef;             //Try Another method Fron another Crud operation
  @ViewChild('name') name:ElementRef;
  @ViewChild('price') price:ElementRef;
  products = []

                                  
  
  constructor(private firebaseService:FirebaseService) { }

  ngOnInit() {
    this.OnFetchProduct()
  }
  OnAddProduct(id,name,price){
     if(this.IsEdit){
       console.log(this.products[this.EditIndex])
       this.products[this.EditIndex]={
        id: id.value,
        name: name.value,
        price: price.value
       }
       this.IsEdit = false;
       this.id.nativeElement.value = '';
       this.name.nativeElement.value = '';
       this.price.nativeElement.value = '';
     }
     else{this.products.push({
      id: id.value,
      name: name.value,
      price: price.value
    })}
  this.OnSaveProduct();
    }
     OnSaveProduct(){
      this.firebaseService.saveProduct(this.products).subscribe();
     } 
     OnFetchProduct(){
      this.fetching = true;
      this.firebaseService.fetchProduct().subscribe((res)=>{
        
        const data = JSON.stringify(res);
        
        this.products= JSON.parse(data);
        
        this.fetching = false;
      })
    }   
     DeleteProduct(id:number){
      if(confirm ("Do You Want Delete This Product")){
        this.products.splice(id,1);
         this.OnSaveProduct();
      }
     }
     
     EditProduct(index:number){
       this.IsEdit = true;
       this.EditIndex = index;
       console.log(this.products[index]);   // Always use Console for testing it gives ideas.
       this.id.nativeElement.value = this.products[index].id;
       this.name.nativeElement.value = this.products[index].name;
       this.price.nativeElement.value = this.products[index].price;
     }
     
}
