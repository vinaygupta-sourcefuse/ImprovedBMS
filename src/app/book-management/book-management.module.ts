import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookManagementRoutingModule } from './book-management-routing.module';
import { BookListComponent } from './book-list/book-list.component';
import { BookFormComponent } from './book-form/book-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormUnsavedChangesGuard } from '../guards/form-unsaved-changes.guard';



@NgModule({
  declarations: [
    BookListComponent,
    BookFormComponent
  ],
  imports: [
    CommonModule,
    BookManagementRoutingModule,
    ReactiveFormsModule
  ],
  providers : [FormUnsavedChangesGuard]
})
export class BookManagementModule { }
