import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {PageRequest, SortDirection} from "../../models/page";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Output() onChangePages: EventEmitter<PageRequest> = new EventEmitter();
  currentPage: number = 1;
  limit: number = 10;
  itemsOnPage: number = 10;

  changePage(page: number): void {
    let newPageNumber = this.currentPage + page;
    if (newPageNumber >= 1 && this.limit >= newPageNumber) {
      console.log("hello")
      this.currentPage = newPageNumber;
      const PageRequest = {
        pageIndex: this.currentPage,
        pageSize: this.itemsOnPage
      }
      this.onChangePages.emit(PageRequest);
    }
  }

  changeItems(newSize: number): void {
    this.itemsOnPage = newSize;
    const PageRequest = {
      pageIndex: this.currentPage,
      pageSize: this.itemsOnPage
    }
    this.onChangePages.emit(PageRequest);
  }

  ngOnInit(): void {
  }

}
