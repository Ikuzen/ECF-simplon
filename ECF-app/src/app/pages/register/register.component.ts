import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user/user.service';
import { User } from 'src/app/user/user';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']

})
export class RegisterComponent implements OnInit {
  username: string;
  password: string;
  email: string;
  usernameTooltip = "";
  user: User;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }
  checkUserName(){
    
  }
  submit() {
    console.log('fields missing')

    if (this.username && this.password && this.email) {
      this.user = { 'username': this.username, 'password': this.password, 'email': this.email }
      this.userService.create(this.user).subscribe((result) => {
        console.log(result)
      });
    }
  }
}
