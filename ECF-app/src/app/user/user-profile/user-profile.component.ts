import { Component, OnInit, Input } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: User;
  constructor(private userService: UserService, private localStorage: LocalStorageService) { }
  ngOnInit(): void {
    this.localStorage.loginEvent$.subscribe((user) => {
      this.userService.getByName(user.username).subscribe((fullUser) => {
        this.user = fullUser;
        console.log(this.user)
      })
    })
  }

  updateInfos() {
    if (this.user.username && this.user.birthDate && this.user.email) {
      this.userService.update(this.user._id, { "username": this.user.username, "birthDate": this.user.birthDate, "email": this.user.email }).subscribe((result) => {
        console.log(result);
        this.localStorage.saveSession(this.user)
      },
        (err) => {
          console.log(err);
        }
      )
    }
    else {
      console.log("error");
    }
  }
}
