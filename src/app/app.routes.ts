import { Routes } from '@angular/router';
import { BookListComponent } from './components/book-list/book-list.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { RentBookComponent } from './components/rent-book/rent-book.component';
import { RentalHistoryComponent } from './components/rental-history/rental-history.component';

export const routes: Routes = [
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: 'books', component: BookListComponent },
  { path: 'add-book', component: AddBookComponent },
  { path: 'rent-book', component: RentBookComponent },
  { path: 'rental-history', component: RentalHistoryComponent }
];