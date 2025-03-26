import { Component, ViewChild } from '@angular/core';
import { BookFormComponent } from './book-management/book-form/book-form.component';
import { Book } from './models/book.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'book-management-app';

}
