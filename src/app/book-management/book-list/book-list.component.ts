import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';
import { Subject } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
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

  // editBookClicked(bookIsbn: number) {
  //   const book = this.booksToDisplay.find(b => b.isbn === bookIsbn);
  //   if (book) {
  //     this.bookForm.setValue({
  //       title: book.title,
  //       author: book.author,
  //       isbn: book.isbn,
  //       price: book.price,
  //       pubDate: this.formatDate(book.pubDate),
  //       genre: book.genre
  //     });

  //     this.deleteBookClicked(book.isbn); // Remove the book from the list
  //   } else {
  //     console.error('Book not found for editing:', bookIsbn);
  //   }
  // }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
