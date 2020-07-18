import { Component, OnInit } from '@angular/core';
import { CrudoperationService } from '../crudoperation.service';
import { User } from 'src/app/_models';

@Component({
  selector: 'app-crudfile',
  templateUrl: './crudfile.component.html',
  styleUrls: ['./crudfile.component.css']
})
export class CrudfileComponent implements OnInit {
  allUsers: Object;
  
  isEdit= false;
  userObj={
    Name:'',
    password:'',
    email:'',
    mobile:'',
    id:''
  }
  constructor(private crudService:CrudoperationService) { }

  ngOnInit(){
this.getCurrentUser();
  }
addUser(FormObject){
  this.crudService.createUser(FormObject).subscribe((res)=>{
  this.getCurrentUser();

  });
}
getCurrentUser() {
  this.crudService.getAllUser().subscribe((response)=>{
    this.allUsers= response;
  })
}
DeleteUser(user){
  this.crudService.deleteUser(user).subscribe(()=>{
    this.getCurrentUser();
  })
} 
EditUser(user){                                          
  this.userObj = user;
  this.isEdit= true
  }
updateUser(){
  this.isEdit= !this.isEdit
  this.crudService.updateUser(this.userObj).subscribe((res)=>{
    this.getCurrentUser();
  })
}
}
