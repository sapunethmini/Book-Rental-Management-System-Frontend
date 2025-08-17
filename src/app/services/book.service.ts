import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';
import { environment } from '../../environments/environment.prod';

@Injectable({ providedIn: 'root' })
export class BookService {
private apiUrl = environment.apiUrl + '/books';
  constructor(private http: HttpClient) {}

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  getAvailableBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/available`);
  }

  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${id}`);
  }

  searchBooks(params: { title?: string, author?: string, genre?: string }): Observable<Book[]> {
    let queryParams = new HttpParams();
    if (params.title) queryParams = queryParams.set('title', params.title);
    if (params.author) queryParams = queryParams.set('author', params.author);
    if (params.genre) queryParams = queryParams.set('genre', params.genre);
    return this.http.get<Book[]>(`${this.apiUrl}/search`, { params: queryParams });
  }

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, book);
  }

  updateBook(id: number, book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/${id}`, book);
  }

  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}