import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CrudoperationService {

  constructor(private crudHttp:HttpClient) { }


  createUser(user){
    return this.crudHttp.post("http://localhost:3000/Employee",user);
  }
  getAllUser(){
  return this.crudHttp.get("http://localhost:3000/Employee");  
  }
  deleteUser(user){
    return this.crudHttp.delete("http://localhost:3000/Employee/"+user.id);
  }
  updateUser(user){
    return this.crudHttp.put("http://localhost:3000/Employee/"+user.id,user);
  }
  }







