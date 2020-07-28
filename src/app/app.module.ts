import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { Pg1Component } from './pg1/pg1.component';
import { Pg2Component } from './pg1/pg2/pg2.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import{NgbdModalBasic} from './pg1/modal-basic'
import { PgService } from './pg.service';

import { MainComponent } from './main/main.component';


const appRoutes: Routes = [
  {path: "", component: Pg1Component,children:[{path:'page2',component:Pg2Component}]},
  {path:'login',component:LoginComponent},
  {path:'admin',component:AdminComponent}
 
];

@NgModule({
  declarations: [
    AppComponent,
    Pg1Component,
    Pg2Component,
    LoginComponent,
    AdminComponent,
    NgbdModalBasic,
    MainComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    NgbModule.forRoot()
  ],
  providers: [PgService],
  bootstrap: [AppComponent]
})
export class AppModule { }
