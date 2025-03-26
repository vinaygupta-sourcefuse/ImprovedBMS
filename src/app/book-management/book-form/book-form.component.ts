import { Component, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { Book } from '../../models/book.model';
import { Observable, Subject } from 'rxjs';
import { BookService } from '../../services/book.service';
import { switchMap, tap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent {
  
  @Output() booksChanged = new EventEmitter<Book[]>();
  

  bookForm: FormGroup;
  books$ = new Subject<Book[]>(); // Store book list reactively
  public unsubscribe$ = new Subject<void>(); // For unsubscribing Observables

  constructor(private fb: FormBuilder, private bookService: BookService) {
    this.bookForm = this.fb.group({
      title: [''],
      author: [''],
      isbn: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],   
      price: ['', [Validators.required, Validators.pattern('^[0-9]*$')]], 
      pubDate: [''],
      genre: ['']
    });
  }

  ngOnInit(): void {
    this.loadBooks(); // Initial load
  }

  loadBooks() {
    this.bookService.getBooks()
      .pipe(
        tap(books => {
          console.log('Books from server:', books); // ✅ Debugging
          this.books$.next(books);
          this.booksChanged.emit(books); // Emit event properly
          console.log('Books emitted successfully'); // ✅ Corrected logging
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe({
        next: () => console.log('Books loaded successfully'),
        error: (err) => console.error('Error loading books:', err) // ✅ Debug error
      });

      return this.books$;
}


  addBook() {
    const book: Book = this.bookForm.value;

    this.bookService.postBook(book)
      .pipe(
        switchMap(() => this.bookService.getBooks()), // Refresh list after adding
        tap(books => {
        
          // this.booksChanged.emit(books);
          this.clearForm();
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe();
  }

  // removeBook(bookId: any) {
  //   this.bookService.deleteBook(bookId.toString())
  //     .pipe(
  //       switchMap(() => this.bookService.getBooks()), // Refresh list after deletion
  //       tap(books => {
        
  //         this.booksChanged.emit(books);
  //       }),
  //       takeUntil(this.unsubscribe$)
  //     )
  //     .subscribe();
  // }

  // editBook(book: Book) {
  //   this.bookForm.setValue({
  //     title: book.title,
  //     author: book.author,
  //     isbn: book.isbn,
  //     price: book.price,
  //     pubDate: this.formatDate(book.pubDate),
  //     genre: book.genre
  //   });

  //   //instead of creating a put request we can remove the book and add it again
  //   this.removeBook(book.isbn); // Remove the book from the list
  
  // }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  clearForm() {
    this.bookForm.reset({
      title: '',
      author: '',
      isbn: '',
      price: '',
      pubDate: '',
      genre: ''
    });
  }

}
