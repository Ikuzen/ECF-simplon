import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user/user.service';
import { User } from 'src/app/user/user';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']

})
export class RegisterComponent implements OnInit {
  username: string;
  password: string;
  email: string;
  birthdate: Date;
  usernameError = "";
  passwordError = "";
  emailError = "";

  user: User;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  submit() {

    if (this.username && this.password && this.email && this.birthdate) {
      this.user = { 'username': this.username, 'password': this.password, 'email': this.email, 'birthDate': this.birthdate }
      this.userService.getByName(this.username)
      .subscribe(
        (result) => { //if name exist, then display error
          this.usernameError = 'There already is a user with that username';
          
      },
        (err) => { // if name doesn't existe, create
          this.userService.create(this.user).subscribe((result) => {
            this.router.navigate(['/login', { success: true }]);
          },
            (error) => {
              if (error.status === 409) {
                this.usernameError = 'There already is a user with that username';
              }
              else if (error?.error?.details[0]?.message === '"email" must be a valid email') {
                this.emailError = '"email" must be a valid email';
              }
            });
        })
    }
  }
}
