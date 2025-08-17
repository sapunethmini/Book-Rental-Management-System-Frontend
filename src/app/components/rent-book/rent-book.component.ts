import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { RentalService } from '../../services/rental.service';
import { Book } from '../../models/book.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rent-book',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './rent-book.component.html'
})
export class RentBookComponent implements OnInit {
  availableBooks: Book[] = [];
  selectedBookIds: number[] = [];
  rental = { userDetails: '', rentalDate: '', returnDate: '' };

  constructor(private bookService: BookService, private rentalService: RentalService, private router: Router) {}

  ngOnInit() {
    this.bookService.getAvailableBooks().subscribe(books => this.availableBooks = books);
  }

  toggleSelection(bookId: number) {
    const index = this.selectedBookIds.indexOf(bookId);
    if (index > -1) {
      this.selectedBookIds.splice(index, 1);
    } else {
      this.selectedBookIds.push(bookId);
    }
  }

  rentBooks() {
    const request = { ...this.rental, bookIds: this.selectedBookIds };
    this.rentalService.createRental(request).subscribe(() => {
      alert('Books rented successfully');
      this.router.navigate(['/rental-history']);
    });
  }
}