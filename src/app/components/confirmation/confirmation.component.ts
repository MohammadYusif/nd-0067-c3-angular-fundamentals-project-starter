import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.css'
})
export class ConfirmationComponent implements OnInit {
  customerName = '';
  orderTotal = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state || history.state;

    if (state && state['name'] && state['total']) {
      this.customerName = state['name'];
      this.orderTotal = state['total'];
    } else {
      this.router.navigate(['/products']);
    }
  }
}
