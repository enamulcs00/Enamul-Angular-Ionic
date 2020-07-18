import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Postuser } from 'src/app/postuser.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-crud-with-post',
  templateUrl: './crud-with-post.component.html',
  styleUrls: ['./crud-with-post.component.css']
})
export class CrudWithPostComponent implements OnInit {
  EditMode:boolean = false;
  EditUserId;
@ViewChild('userForm') userForm:NgForm;
postUrl = 'https://enamulgfb.firebaseio.com/postUser.json'
  Technology = [];
  constructor(private _posthttp:HttpClient) { }
AddDetail(){
  
  this. Technology.push(name);
}  

  ngOnInit(){
    this.fetchPostedUser();
  }
AddUser(userData:Postuser){
  if(this.EditMode){ 
this._posthttp.put('https://enamulgfb.firebaseio.com/postUser/'+this.EditUserId+'.json',userData).subscribe((result)=>{

  this.fetchPostedUser();
})


this.userForm.setValue({
  name: '',
  technology: '' 
})
this.EditMode = false;
  }
  else
  {
this.Technology.push(userData);
this._posthttp.post<Postuser>(this.postUrl,userData).subscribe();
this.userForm.setValue({
  name: '',
  technology: '' 
})
  }

}
fetchPostedUser(){
  this._posthttp.get<Postuser>(this.postUrl).pipe(map(UserResponse=>{
const userArray = [];
for(const key in UserResponse){
// console.log(key);
// console.log(UserResponse[key]);
// console.log(UserResponse.hasOwnProperty(key))
if(UserResponse.hasOwnProperty(key)){
userArray.push({UserId:key, ...UserResponse[key]})    //... three dot is Spread Operator
  }
}
  return userArray;
  })).subscribe((users)=>{
    //console.log(users);
    this.Technology = users;
  })
}
DeletUser(UserId){
  if(confirm('Do You want to Delete UserDetails?')){
    //console.log(UserId);
     this._posthttp.delete('https://enamulgfb.firebaseio.com/postUser/'+UserId+'.json')
     .subscribe(()=>{
       this.fetchPostedUser();
     });
    
  }
}
EditUser(UserId,index){
  this.EditMode = true;
  this.EditUserId = UserId;
  
  // console.log(this.Technology[index])
  this.userForm.setValue({
    name: this.Technology[index].name,
    technology: this.Technology[index].technology 
  })
  
}
}
