import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrudfileComponent } from '../CRUD/crudfile/crudfile.component';
import { FirebasepageComponent } from '../CrudWithGoogleFireBase/firebasepage/firebasepage.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CrudfileComponent,
    FirebasepageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ]
})
export class CrudModuleModule { }
