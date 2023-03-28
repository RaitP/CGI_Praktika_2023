import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Observable } from 'rxjs';
import {Page, PageRequest} from '../../models/page';
import {Checkout} from "../../models/checkout";

@Component({
  selector: 'app-checkouts-list',
  templateUrl: './checkouts-list.component.html',
  styleUrls: ['./checkouts-list.component.css']
})
export class CheckoutsListComponent implements OnInit{

  checkouts$!: Observable<Page<Checkout>>;

  information: PageRequest = {
    pageIndex: 1,
    pageSize: 10,

  };

  constructor(
    private bookService: BookService,
  ) {
  }

  changePage(pagerequest: PageRequest){
    this.information = pagerequest;
    this.ngOnInit();
  }

  ngOnInit(): void {
    this.checkouts$ = this.bookService.getCheckouts(this.information);
    //console.log(this.books$)
    //this.books$ = this.bookService.getBooks({});
  }

}
