import { Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnChanges {
  pageNumber!: number;
  pageCount!: number;
  nameSearchValue!: string;
  params!: any;
  url!: string;
  count!: any;
  @Input() dataPage: any;

  @Input()
  set pageNumberValue(value: number) {
    this.pageNumber = Number(value);
  }

  @Input()
  set nameSearch(value: string) {
    this.nameSearchValue = value;
  }

  @Input()
  set urlRouter(value: string) {
    this.url = value;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.dataPage) {
      this.count = this.dataPage.count;
      const count = this.count / 20;
      this.pageCount = Math.round(count);
    }
  }

  constructor(private router: Router) {}

  pageChange(newPage: number): void {
    if (this.nameSearchValue) {
      this.router.navigate([this.url, newPage, this.nameSearchValue]);
    } else {
      this.router.navigate([this.url, newPage]);
    }

  }
}
