import { Inject, Injectable, InjectionToken } from '@angular/core';
import { User } from '../user/user';
@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {

  constructor() {
  }
  storage = window.localStorage;
  saveSession(user: User){
    this.storage.setItem("username", user.username);
  }

  checkSession(){
    if(this.storage.getItem("username")){
      return true;
    }
    else{
      return false;
    }
  }

  logOut(){
    this.storage.clear();
  }
}