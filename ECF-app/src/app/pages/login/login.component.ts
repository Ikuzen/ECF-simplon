import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/user/user.service';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']

})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  accountCreated = false;
  errorMessage = "";
  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService
  ) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params.success === "true") {
        this.accountCreated = true;
      }
    });

  };
  login() {
    if (this.username && this.password) {
      this.userService.getByName(this.username).subscribe((result) => {
        if (result.password === this.password) {

        }
        else {
          this.errorMessage = 'wrong password';
        }
      },
        (error) => {
          this.errorMessage = "user does not exist";
        });
    }
  }
}
