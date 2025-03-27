import { Component } from '@angular/core';
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
  editBookIsbn !:  number;
  bookForm: FormGroup;
  books$ = new Observable<Book[]>(); // Store book list reactively
  private unsubscribe$ = new Subject<void>();
  
  constructor(private fb: FormBuilder,  private bookManager: BookManagerService,   private route: ActivatedRoute ) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      isbn: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],   
      price: ['', [Validators.required, Validators.pattern('^[0-9]*$')]], 
      pubDate: ['', Validators.required],
      genre: ['', Validators.required]
    });    
  }

  canExit(): boolean {
    if (  this.bookForm.value.title || this.bookForm.value.author ||  this.bookForm.value.isbn ||  this.bookForm.value.price ||  this.bookForm.value.pubDate ||  this.bookForm.value.genre) {
      return confirm('Are you sure you want to leave?');
    }
    return true;
  }

ngOnInit(): void {
  this.bookManager.loadBooks();

  this.route.queryParams.subscribe(params => {
    const isbn = params['isbn'];
    
    if (Number(isbn)) {
      this.isEditMode = true;
      this.editBookIsbn = Number(isbn);
      this.bookManager.books$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(books => {
        const book = books.find(b => b.isbn === +isbn);
        if (book) {
          this.bookForm.setValue({
            title: book.title,
            author: book.author,
            isbn: book.isbn,
            price: book.price,
            pubDate: this.formatDate(book.pubDate),
            genre: book.genre
          });
          this.bookForm.get('isbn')?.disable(); // DISABLE here
        }
      });
    
    }
  });
}

submitForm() {
  if (this.bookForm.invalid) {
    this.bookForm.markAllAsTouched(); // Force all validation messages to show
    return;
  }

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
