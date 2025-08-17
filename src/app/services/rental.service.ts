import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rental } from '../models//rental.model';
import { environment } from '../../environments/environment.prod';

@Injectable({ providedIn: 'root' })
export class RentalService {
  private apiUrl = environment.apiUrl + '/rentals';


  constructor(private http: HttpClient) {}

  getAllRentals(): Observable<Rental[]> {
    return this.http.get<Rental[]>(this.apiUrl);
  }

  createRental(rental: { userDetails: string; rentalDate: string; returnDate: string; bookIds: number[] }): Observable<Rental> {
    return this.http.post<Rental>(this.apiUrl, rental);
  }
}