import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Observable } from 'rxjs';
import { Page } from '../../models/page';
import {Checkout} from "../../models/checkout";

@Component({
  selector: 'app-checkouts-list',
  templateUrl: './checkouts-list.component.html',
  styleUrls: ['./checkouts-list.component.css']
})
export class CheckoutsListComponent implements OnInit{

  checkouts$!: Observable<Page<Checkout>>;

  constructor(
    private bookService: BookService,
  ) {
  }

  ngOnInit(): void {
    this.checkouts$ = this.bookService.getCheckouts({});
    //console.log(this.books$)
    //this.books$ = this.bookService.getBooks({});
  }

}
