import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book-list.component.html'
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  selectedBook: Book | null = null;
  titleSearch: string = '';
  authorSearch: string = '';
  genreSearch: string = '';
  idSearch: number | null = null;
  showOnlyAvailable: boolean = true;

  @ViewChild('updateModal') updateModal!: ElementRef; // Reference to modal element

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    console.log('Loading books, showOnlyAvailable:', this.showOnlyAvailable); // Debug
    if (this.showOnlyAvailable) {
      this.bookService.getAvailableBooks().subscribe({
        next: (books) => this.books = books,
        error: (err) => console.error('Error loading available books:', err)
      });
    } else {
      this.bookService.getAllBooks().subscribe({
        next: (books) => this.books = books,
        error: (err) => console.error('Error loading all books:', err)
      });
    }
  }

  search() {
    const params = {
      title: this.titleSearch || undefined,
      author: this.authorSearch || undefined,
      genre: this.genreSearch || undefined
    };
    this.bookService.searchBooks(params).subscribe({
      next: (books) => this.books = books,
      error: (err) => console.error('Error searching books:', err)
    });
  }

  getById() {
    if (this.idSearch) {
      this.bookService.getBookById(this.idSearch).subscribe({
        next: (book) => this.books = [book],
        error: (err) => console.error('Error getting book by ID:', err)
      });
    }
  }

  resetSearch() {
    this.titleSearch = '';
    this.authorSearch = '';
    this.genreSearch = '';
    this.idSearch = null;
    this.loadBooks();
  }

  openUpdateModal(book: Book) {
    this.selectedBook = { ...book }; // Deep copy to avoid modifying original
    console.log('Opening modal with book:', this.selectedBook); // Debug
    if (this.updateModal) {
      const modal = new (window as any).bootstrap.Modal(this.updateModal.nativeElement);
      modal.show();
    } else {
      console.error('Modal element not found');
    }
  }

  saveUpdate() {
    if (this.selectedBook && this.selectedBook.bookId) {
      console.log('Updating book:', this.selectedBook); // Debug
      this.bookService.updateBook(this.selectedBook.bookId, this.selectedBook).subscribe({
        next: () => {
          console.log('Book updated successfully');
          const modal = (window as any).bootstrap.Modal.getInstance(this.updateModal.nativeElement);
          modal.hide();
          this.selectedBook = null;
          this.loadBooks(); // Refresh table
        },
        error: (err) => {
          console.error('Error updating book:', err);
          alert('Failed to update book: ' + err.message);
        }
      });
    } else {
      console.error('No book selected or bookId missing');
    }
  }

  deleteBook(id: number) {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(id).subscribe({
        next: () => this.loadBooks(),
        error: (err) => console.error('Error deleting book:', err)
      });
    }
  }
}