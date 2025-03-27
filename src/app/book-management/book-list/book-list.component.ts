import { Component, OnInit, OnDestroy } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { Subject } from 'rxjs';
import {  takeUntil } from 'rxjs/operators';
import { BookManagerService } from 'src/app/services/book-manager.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit, OnDestroy {
  
  booksToDisplay: Book[] = []; // Properly initialized
  private unsubscribe$ = new Subject<void>(); // For unsubscribing Observables

  constructor(private bookManager: BookManagerService) {}

  ngOnInit(): void {
    this.bookManager.loadBooks();
    this.bookManager.books$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(books => {
        this.booksToDisplay = books;
      });
  }

  deleteBookClicked(bookIsbn: number) {
    this.bookManager.deleteBook(bookIsbn.toString());
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
