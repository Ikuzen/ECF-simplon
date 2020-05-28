import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  constructor(private userService: UserService) { }
  userList: User[]
  ngOnInit(): void {
    this.userService.getAll().subscribe((users)=>{
      this.userList = users;
      console.log(this.userList)
    })
  }

}
