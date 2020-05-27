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
  usernameError = "";
  passwordError = "";
  emailError = "";

  user: User;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }
  checkUserNameValidity(){
    
  }
  submit() {
    console.log('fields missing')

    if (this.username && this.password && this.email) {
      this.user = { 'username': this.username, 'password': this.password, 'email': this.email }
      this.userService.create(this.user).subscribe((result) => {
        console.log('success')
      },
      (error) => {
        console.log(error);
        if (error.status === 409){
          this.usernameError = 'There already is a user with the username "test"';
        }
        else if(error?.error?.details[0]?.message === '"email" must be a valid email'){
            this.emailError = '"email" must be a valid email';
        }
      })
      ;
    }
  }
}
