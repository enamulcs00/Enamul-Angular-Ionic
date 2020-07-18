import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-testinfile',
  templateUrl: './testinfile.component.html',
  styleUrls: ['./testinfile.component.css']
})
export class TestinfileComponent implements OnInit {
  test:string = "Contact Page";
  submitted:boolean = false;
  contactForm:FormGroup;
  contact= {
    name:'',
    email:'',
    text:''
  }
    constructor() {
      
     }
  
    ngOnInit(): void {
    }
  
    createForm(){
      this.contactForm = new FormGroup({
        'name':new FormControl(this.contact.name,[
          Validators.required,Validators.minLength(4)
        ]),
        'email':new FormControl(this.contact.email,[
          Validators.required,Validators.email
        ]),
        'text':new FormControl(this.contact.text,
          Validators.required)
      });}
      onSubmit(){
        this.submitted = true;
      }
    }