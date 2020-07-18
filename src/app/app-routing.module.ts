import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { AuthGuard } from './_helpers';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { CrudfileComponent } from './CRUD/crudfile/crudfile.component';
import { FirebasepageComponent } from './CrudWithGoogleFireBase/firebasepage/firebasepage.component';
import { PipeOperationComponent } from './pipe-operation/pipe-operation.component';
import { CrudWithPostComponent } from './CrudWithGoogleFireBase/crud-with-post/crud-with-post.component';
import { TestinfileComponent } from './testinfile/testinfile.component';
import { ContactformComponent } from './contactform/contactform.component';



const routes: Routes = [{ path: '', component: HomeComponent, canActivate: [AuthGuard] },
{ path: 'login', component: LoginComponent },
{ path: 'register', component: RegisterComponent },
{path:'crudOperation',component:CrudfileComponent},
{path:'crudwithGfB',component:FirebasepageComponent},
{path:'pipeOperation',component:PipeOperationComponent},
{path:'crudbypost',component:CrudWithPostComponent},
{path:'testing',component:TestinfileComponent},
{path:'contactform',component:ContactformComponent,

children:[{
  path:'home',component:HomeComponent
}]},

// otherwise redirect to home
{ path: '**', redirectTo: '' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
