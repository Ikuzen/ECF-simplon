import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss']
})
export class PasswordRecoveryComponent implements OnInit {
  messsage:string;
  username:string;
  email:string;
  recoveredPassword:string;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  recover(){
    this.messsage =""
    if(this.username && this.email){
      this.userService.getByName(this.username).subscribe((user)=>{
        if(user.email === this.email){ //case of successful recovery
          this.recoveredPassword = user.password;
        }
        else if(user.email !== this.email){
          this.messsage = "the username and address don't match"
        }
      },
      (err)=>{
        if(err.status === 404){
          this.messsage = "the username or email does not exist"
        }
      })
    }
    else{
      this.messsage = "fields are missing"
    }
  }
}
