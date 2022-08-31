import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {NavItem} from '../../model/nav/nav-item';
import {Router} from '@angular/router';
import {NavService} from '../../services/nav.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  animations: [
    trigger('closeOpen', [
      state('open', style({
        height: 'auto',
        opacity: 1,
        'min-height': '150px',
      })),
      state('closed', style({
        height: '0px',
        'min-height': '0px',
        opacity: 0.5,
      })),
      transition('open => closed', [
        animate('500ms')
      ]),
      transition('closed => open', [
        animate('500ms')
      ]),
    ]),
    trigger('indicatorRotate', [
      state('collapsed', style({transform: 'rotate(0deg)'})),
      state('expanded', style({transform: 'rotate(180deg)'})),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
})
export class NavComponent implements OnInit {
  expanded!: boolean;
  @Input() item!: NavItem;
  @Input() depth!: number;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;

  constructor(public navService: NavService, public router: Router) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  ngOnInit(): void {
    this.navService.currentUrl.subscribe((url: string) => {
      if (this.item.route && url) {
        // console.log(`Checking '/${this.item.route}' against '${url}'`);
        this.expanded = url.indexOf(`/${this.item.route}`) === 0;
        this.ariaExpanded = this.expanded;
        // console.log(`${this.item.route} is expanded: ${this.expanded}`);
      }
    });
  }

  onItemSelected(item: NavItem): void {
    if (!item.children || !item.children.length) {
      this.router.navigate([item.route]);
      // this.navService.closeNav();
    }
    if (item.children && item.children.length) {
      this.expanded = !this.expanded;
    }
  }

}
