import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Observable } from 'rxjs';
import {Page, PageRequest} from '../../models/page';
import { Book } from '../../models/book';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit {

  books$!: Observable<Page<Book>>;
  currentPage: number = 1;
  itemsOnPage: number = 10;
  information: PageRequest = {
    pageIndex: 1,
    pageSize: 10
  };

  constructor(
    private bookService: BookService,
  ) {
  }

  changePage(filters: PageRequest){
    this.information = filters;
    this.ngOnInit();
  }

  ngOnInit(): void {
    // TODO this observable should emit books taking into consideration pagination, sorting and filtering options.
    this.books$ = this.bookService.getBooks(this.information);
    //this.books$ = this.bookService.getBooks({});

  }

}
