import { Component, OnInit, ViewChild } from '@angular/core';
import { BookFormComponent } from '../book-management/book-form/book-form.component';
import { Book } from '../models/book.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-management-base',
  templateUrl: './book-management-base.component.html',
  styleUrls: ['./book-management-base.component.scss']
})
export class BookManagementBaseComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  }
  

