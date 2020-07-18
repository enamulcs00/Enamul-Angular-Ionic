import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AlertComponent } from './_components';
import { JwtInterceptor, ErrorInterceptor, fakeBackendProvider } from './_helpers';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CrudModuleModule } from './crud-module/crud-module.module';
import { FirebaseService } from './CrudWithGoogleFireBase/firebase.service';
import { CrudoperationService } from './CRUD/crudoperation.service';
import { PipeOperationComponent } from './pipe-operation/pipe-operation.component';
import { CustomPipe } from './pipe-operation/custom.pipe';
import { FilterpipePipe } from './pipe-operation/filterpipe.pipe';
import { CrudWithPostComponent } from './CrudWithGoogleFireBase/crud-with-post/crud-with-post.component';
import { TestinfileComponent } from './testinfile/testinfile.component';
import { ContactformComponent } from './contactform/contactform.component';
import { LoginService } from './contactform/login.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
   RegisterComponent,
   AlertComponent,
   PipeOperationComponent,
   CustomPipe,
   FilterpipePipe,
   CrudWithPostComponent,
   TestinfileComponent,
   ContactformComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
   ReactiveFormsModule,
   HttpClientModule,
   BrowserAnimationsModule,
   FormsModule,
   CrudModuleModule,
   
    
    
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
   BsDatepickerModule.forRoot()   

  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider,FirebaseService,CrudoperationService,LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
