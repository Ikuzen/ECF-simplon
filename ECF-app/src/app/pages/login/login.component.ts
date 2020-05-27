import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']

})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  email: string;
  usernameTooltip = "";
  constructor() { }

  ngOnInit(): void {
  }

  submit(){
    if(!this.username || !this.password || !this.email){
    }
  }
}
