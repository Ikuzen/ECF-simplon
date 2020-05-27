import { Component, OnInit } from '@angular/core';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  constructor(private router: Router,   private route: ActivatedRoute,
    ) { }
  accountCreated = false;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params.success = true){
        this.accountCreated = true;
      }
    });
  }

  navigate(link: any){
    this.router.navigate([link]);
  }
}
