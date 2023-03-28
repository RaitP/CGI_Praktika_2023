import {Component, OnInit} from '@angular/core';
import {BookService} from '../../services/book.service';
import {Book} from '../../models/book';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {map, switchMap} from 'rxjs/operators';
import {BookStatus} from "../../models/book-status";

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {
  book$!: Observable<Book>;
  id: string = "";
  title: string = "";
  author: string = "";
  genre: string = "";
  year: number = 0;
  added: string = "";
  checkOutCount: number = 0;
  status: BookStatus = "AVAILABLE";
  dueDate: string = "";
  comment: string = "";

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
  ) {
  }

  ngOnInit(): void {
    this.book$ = this.route.params
      .pipe(map(params => params['id']))
      .pipe(switchMap(id => this.bookService.getBook(id)))
    this.book$.subscribe(
      (res) => {
        this.id = res.id;
        this.author = res.author;
        this.title = res.title;
        this.added = res.added;
        this.genre = res.genre;
        this.year = res.year;
        this.checkOutCount = res.checkOutCount;
        this.status = res.status;
        this.dueDate = res.dueDate;
        this.comment = res.comment;
      }
    );
  }

  changeInfo() {
    const newBook = {
      id: this.id,
      title: this.title,
      author: this.author,
      genre: this.genre,
      year: this.year,
      added: this.added,
      checkOutCount: this.checkOutCount,
      status: this.status,
      dueDate: this.dueDate,
      comment: this.comment
    }

    this.bookService.saveBook(newBook).subscribe();
    this.ngOnInit();
  }

  borrow(): void {
    this.status = "BORROWED"
    console.log("Booking")
  }


}
