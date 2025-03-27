// book-manager.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { BookService } from './book.service';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookManagerService {
  private booksSubject = new BehaviorSubject<Book[]>([]);
  books$ = this.booksSubject.asObservable();

  constructor(private bookService: BookService) {}

  loadBooks(): void {
    this.bookService.getBooks()
      .pipe(
        tap(books => this.booksSubject.next(books))
      )
      .subscribe();
  }

  addBook(book: Book): void {
    this.bookService.postBook(book)
      .pipe(
        switchMap(() => this.bookService.getBooks()),
        tap(books => this.booksSubject.next(books))
      )
      .subscribe();
  }

  editBook(isbn: string, updatedBook: Book): void {
    this.bookService.updateBook(isbn, updatedBook)
      .pipe(
        switchMap(() => this.bookService.getBooks()),
        tap(books => this.booksSubject.next(books))
      )
      .subscribe();
  }

  deleteBook(isbn: string): void {
    this.bookService.deleteBook(isbn)
      .pipe(
        switchMap(() => this.bookService.getBooks()),
        tap(books => this.booksSubject.next(books))
      )
      .subscribe();
  }

  getBookByIsbn(isbn: string): Book | undefined { 
    const currentBooks = this.booksSubject.getValue();
    return currentBooks.find(book => book.isbn.toString() === isbn);
  }
}
