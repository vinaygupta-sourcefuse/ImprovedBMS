import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { Book } from './models/book.model';

const routes: Routes = [
  { path: '', redirectTo: '/book-management', pathMatch: 'full' },
  { 
    path: 'book-management', 
    loadChildren: () => import('./book-management/book-management.module').then(m => m.BookManagementModule) 
  },
  { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
