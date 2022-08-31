import { Component, OnInit } from '@angular/core';
import {Router, NavigationEnd, ActivatedRoute} from '@angular/router';
import { filter, map } from 'rxjs/operators';
import {Title} from '@angular/platform-browser';
import {AuthenticationService} from '../../services/authentication.service';
@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  titleBreadcrumb!: string;
  title!: string;
  messages: any;
  constructor(private router: Router, private titleService: Title, private activatedRoute: ActivatedRoute,
              private callData: AuthenticationService) {
    this.getNews();
  }

  ngOnInit(): void {
    const appTitle = this.titleService.getTitle();
    this.router
        .events.pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          const child = this.activatedRoute.firstChild;
          const children = this.activatedRoute.children;
          if (child) {
            if (child.snapshot.data.title) {
              this.title = appTitle + ' - ' + child.snapshot.data.title;
              if (children[0].snapshot.firstChild &&
                  children[0].snapshot.firstChild.firstChild &&
                  children[0].snapshot.firstChild.firstChild.data && children[0].snapshot.firstChild.firstChild.data.title) {
                this.title = this.title + ' - ' + children[0].snapshot.firstChild.firstChild.data.title;
              }
              return this.title;
            }
          }
          return appTitle;
        })
    ).subscribe((ttl: string) => {
      this.titleBreadcrumb = ttl;
      this.titleService.setTitle(ttl);
    });
  }

  getNews(): void {
    this.callData.getMessages().subscribe( res => {
      this.messages = res;
    });
  }
}
