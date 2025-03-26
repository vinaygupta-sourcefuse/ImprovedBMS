import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';
import { Subject } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit, OnDestroy {
  // @Output() onRemoveBook = new EventEmitter<number>();
  // @Output() onEditBook = new EventEmitter<number>();
 

  booksToDisplay: Book[] = []; // Properly initialized
  private unsubscribe$ = new Subject<void>(); // For unsubscribing Observables

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getBooks()
      .pipe(
        tap(response => {
          this.booksToDisplay = response; // Ensure booksToDisplay is always an array
        }) 
      )
      .subscribe({
        next: () => console.log('Books updated in UI:', this.booksToDisplay),
        error: (err) => console.error('Error loading books:', err)
      });
  }
  
  
  deleteBookClicked(bookIsbn: number) {
    this.bookService.deleteBook(bookIsbn.toString())
      .pipe(
        switchMap(() => this.bookService.getBooks()), // Refresh list after deletion
        tap(books => {
          this.booksToDisplay = books; // Update the displayed books
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe({
        next: () => console.log('Book deleted and list refreshed'),
        error: (err) => console.error('Error deleting book:', err)
      });
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
