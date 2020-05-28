import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(private router: Router, private storageService: LocalStorageService) { }
  isConnected: boolean;
  items: MenuItem[];

  ngOnInit() {
    this.isConnected = this.storageService.checkSession();
    if (!this.isConnected) {
      this.items = [{
        label: 'Home', routerLink: ['/pages']
      }];
    }
    else if (this.isConnected) {
      this.items = [{
        label: 'Home', routerLink: ['/pages']
      },
      { label: 'Profile', routerLink: ["/profile"] }];
    }
  }


  navigate(link: any) {
    this.router.navigate([link]);
  }
  logout(){
    this.storageService.logOut();
  }
}
