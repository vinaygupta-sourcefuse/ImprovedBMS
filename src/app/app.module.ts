import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookManagementBaseComponent } from './book-management-base/book-management-base.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { BookListComponent } from './book-management/book-list/book-list.component';
import { CommonModule } from '@angular/common';
import { BookFormComponent } from './book-management/book-form/book-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormUnsavedChangesGuard } from './guards/form-unsaved-changes.guard';

@NgModule({
  declarations: [
    AppComponent,
    BookManagementBaseComponent,
    PageNotFoundComponent,
    BookListComponent,
    BookFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [FormUnsavedChangesGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
