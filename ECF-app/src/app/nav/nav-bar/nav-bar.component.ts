import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  items: MenuItem[];
  isConnected: boolean;
  constructor(private router: Router, private storageService: LocalStorageService) {
  }

  ngOnInit() {
    this.items = [{
      label: 'Home', routerLink: ['/pages']
    }];
    this.storageService.loginEvent$.subscribe((result) => {
      console.log(result)
      if (!result.username) {
        this.isConnected = false;
        this.items = [{
          label: 'Home', routerLink: ['/pages'],
        }];
      }
      if (result.username) {
        this.isConnected = true;
        this.items = [{
          label: 'Home', routerLink: ['/pages']
        },
        { label: `Welcome ${result.username}`, routerLink: ["/user"] }
        ];
      }
      console.log(this.isConnected)
    });
  }


  navigate(link: any) {
    this.router.navigate([link]);
  }
  logout() {
    this.storageService.logOut();
    this.navigate("/pages");
  }
}
