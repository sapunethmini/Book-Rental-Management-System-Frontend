import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-book.component.html'
})
export class AddBookComponent {
  book: Book = { title: '', author: '', genre: '', available: true }; // Initialize with available: true

  constructor(private bookService: BookService, private router: Router) {}

  addBook() {
    console.log('Sending book:', this.book); // Debug: Log payload before sending
    this.bookService.addBook(this.book).subscribe({
      next: () => {
        alert('Book added successfully');
        this.router.navigate(['/books']);
      },
      error: (err) => {
        console.error('Error adding book:', err); // Debug: Log errors
        alert('Failed to add book: ' + err.message);
      }
    });
  }
}