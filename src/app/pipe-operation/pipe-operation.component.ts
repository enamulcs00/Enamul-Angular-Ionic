import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pipe-operation',
  templateUrl: './pipe-operation.component.html',
  styleUrls: ['./pipe-operation.component.css']
})
export class PipeOperationComponent implements OnInit {
PipeEx ="This Line is modified By  Pipe. As it was in form of lowercase only starting of 'This and Pipe', was capital"
customExample = "Custom Example";
date = new Date();
productSearch:string = '';
  
  ProductArray =[{name:'Mobile',price:'8000',availability:'Available'},
  {name:'TV',price:'16000',availability:'Not Available'},
  {name:'Laptop Sumsung',price:'38000',availability:'Available'},
  {name:'Tv LG',price:'28000',availability:'Available'},
  {name:'Sumsung Mobiles',price:'9000',availability:'Available'},
  {name:'Fan Orient',price:'2800',availability:'Available'},
  {name:'Cooler Orient',price:'8000',availability:'Not Available'},
  {name:'Freeze LG',price:'28000',availability:'Available'},
  ]
  AddProduct(add){
    this.ProductArray.push({
      name:add.value,price:'28000',availability:'Available'
    });
  }
  constructor() { }

  ngOnInit() {
  }

}
