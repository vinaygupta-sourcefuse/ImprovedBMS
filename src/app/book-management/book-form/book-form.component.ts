import { Component, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book } from '../../models/book.model';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { BookManagerService } from 'src/app/services/book-manager.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent {
  
 
  isEditMode = false;
  editBookIsbn = '';
  bookForm: FormGroup;
  books$ = new Observable<Book[]>(); // Store book list reactively
  private unsubscribe$ = new Subject<void>();
  constructor(private fb: FormBuilder,  private bookManager: BookManagerService,   private route: ActivatedRoute ) {
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
  this.bookManager.loadBooks();

  this.route.queryParams.subscribe(params => {
    const isbn = params['isbn'];
    if (isbn) {
      this.isEditMode = true;
      this.editBookIsbn = isbn;
      this.bookManager.books$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(books => {
        const book = books.find(b => b.isbn === isbn);
        if (book) {
          this.bookForm.setValue({
            title: book.title,
            author: book.author,
            isbn: book.isbn,
            price: book.price,
            pubDate: this.formatDate(book.pubDate),
            genre: book.genre
          });
        }
      });
    
    }
  });
}

submitForm() {
  const book: Book = this.bookForm.value;
  if (this.isEditMode) {
    this.bookManager.editBook(this.editBookIsbn, book); // <- implement updateBook
  } else {
    this.bookManager.addBook(book);
  }
  this.clearForm();
}

addBook() {
  const book: Book = this.bookForm.value;
  this.bookManager.addBook(book);
  this.clearForm();
}

formatDate(dateString: string): string {
    const dateRegex = /^(\d{4})-(\d{2})-(\d{2})$/;
    const match = dateString.match(dateRegex);

    if (!match) {
      console.error('Invalid date string format:', dateString); // Debugging invalid date
      return ''; // Return an empty string for invalid formats
    }

    const [_, year, month, day] = match;
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

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
