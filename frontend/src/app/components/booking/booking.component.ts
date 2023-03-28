import { Component, OnInit} from '@angular/core';
import {Book} from "../../models/book";
import {Checkout} from "../../models/checkout";
import {map, switchMap} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";
import {BookService} from "../../services/book.service";
import {Observable} from "rxjs";
import {BookStatus} from "../../models/book-status";


@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit{
  id: string = "";
  borrowerFirstName: string = "";
  borrowerLastName: string = "";
  borrowedBook: Book = {
    id: "",
    title: "",
    author:  "",
    genre:  "",
    year: 0,
    added:  "",
    checkOutCount:  0,
    status: "AVAILABLE",
    dueDate: "",
    comment: ""
  };
  checkedOutDate: string = "";
  dueDate: string = "";
  returnedDate: string = "";

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
  ) {
  }

  ngOnInit(): void {
    this.route.params
      .pipe(map(params => params['id']))
      .pipe(switchMap(id => this.bookService.getBook(id))).subscribe(
        (res) => this.borrowedBook
      )
  }

  bookBook(): void{
    const newCheckout = {
      id: this.id,
      borrowerFirstName: this.borrowerFirstName,
      borrowerLastName: this.borrowerLastName,
      borrowedBook: this.borrowedBook,
      checkedOutDate: this.checkedOutDate,
      dueDate: this.dueDate,
      returnedDate: this.returnedDate
    };

    this.bookService.saveCheckOut(newCheckout).subscribe();
}

}
