import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesComponent } from './pages/pages.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { UserComponent } from './user/user.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { FormsModule } from '@angular/forms'
import { PagesModule } from './pages/pages.module';
import { UserService } from './user/user.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {MenubarModule} from 'primeng/menubar';
import { NavBarComponent } from './nav/nav-bar/nav-bar.component';
import { MenuModule } from 'primeng/menu';
import { LocalStorageService } from './services/local-storage.service';

@NgModule({
  declarations: [
    AppComponent,
    PagesComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    UserProfileComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MenubarModule,
    MenuModule,

  ],
  providers: [UserService, LocalStorageService, Storage],
  bootstrap: [AppComponent]
})
export class AppModule { }
