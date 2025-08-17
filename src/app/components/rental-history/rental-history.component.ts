import { Component, OnInit } from '@angular/core';
import { RentalService } from '../../services/rental.service';
import { Rental } from '../../models/rental.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rental-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rental-history.component.html'
})
export class RentalHistoryComponent implements OnInit {
  rentals: Rental[] = [];

  constructor(private rentalService: RentalService) {}

  ngOnInit() {
    this.rentalService.getAllRentals().subscribe(rentals => this.rentals = rentals);
  }
}