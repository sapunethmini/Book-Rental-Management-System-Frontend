import { Book } from './book.model';

export interface Rental {
  rentalId?: number;
  userDetails: string;
  rentalDate: string;
  returnDate: string;
  books: Book[];  
}