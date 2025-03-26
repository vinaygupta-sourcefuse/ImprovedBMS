import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookManagementRoutingModule } from './book-management-routing.module';
import { BookListComponent } from './book-list/book-list.component';
import { BookFormComponent } from './book-form/book-form.component';



@NgModule({
  declarations: [
     
  ],
  imports: [
    CommonModule,
    BookManagementRoutingModule
  ]
})
export class BookManagementModule { }
