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
  information: PageRequest = {
    pageIndex: 1,
    pageSize: 10
  };

  constructor(
    private bookService: BookService,
  ) {
  }

  changePage(pagerequest: PageRequest){
    this.information = pagerequest;
    this.ngOnInit();
  }

  deleteBook(id: string) {
    this.bookService.deleteBook(id).subscribe();
    this.ngOnInit();
  }

  ngOnInit(): void {
    // TODO this observable should emit books taking into consideration pagination, sorting and filtering options.
    this.books$ = this.bookService.getBooks(this.information);
    console.log("jookseb")
    //this.books$ = this.bookService.getBooks({pageIndex:2, pageSize:10, direction:"desc"});

  }

}
