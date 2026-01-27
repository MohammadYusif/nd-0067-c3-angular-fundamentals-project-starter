import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];

  // Checkout form fields
  fullName = '';
  address = '';
  creditCard = '';

  // Validation error messages (updated via ngModelChange)
  fullNameError = '';
  addressError = '';
  creditCardError = '';

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe((items) => {
      this.cartItems = items;
    });
    this.cartItems = this.cartService.getCartItems();
  }

  get cartTotal(): number {
    return this.cartService.getCartTotal();
  }

  get isCartEmpty(): boolean {
    return this.cartItems.length === 0;
  }

  get isFormValid(): boolean {
    return (
      this.fullName.trim().length >= 3 &&
      this.address.trim().length >= 6 &&
      this.creditCard.length >= 16 &&
      this.isCreditCardValid()
    );
  }

  // Validation method called by ngModelChange for full name
  validateFullName(): void {
    if (this.fullName.length === 0) {
      this.fullNameError = '';
    } else if (this.fullName.trim().length < 3) {
      this.fullNameError = 'Name must be at least 3 characters';
    } else {
      this.fullNameError = '';
    }
  }

  // Validation method called by ngModelChange for address
  validateAddress(): void {
    if (this.address.length === 0) {
      this.addressError = '';
    } else if (this.address.trim().length < 6) {
      this.addressError = 'Address must be at least 6 characters';
    } else {
      this.addressError = '';
    }
  }

  // Validation method called by ngModelChange for credit card
  validateCreditCard(): void {
    // Remove any non-digit characters for validation
    const digitsOnly = this.creditCard.replace(/\D/g, '');

    if (this.creditCard.length === 0) {
      this.creditCardError = '';
    } else if (this.creditCard !== digitsOnly) {
      this.creditCardError = 'Credit card must contain only numbers';
    } else if (digitsOnly.length < 16) {
      this.creditCardError = 'Credit card must be at least 16 digits';
    } else {
      this.creditCardError = '';
    }
  }

  // Check if credit card contains only numbers
  isCreditCardValid(): boolean {
    const digitsOnly = this.creditCard.replace(/\D/g, '');
    return this.creditCard === digitsOnly && digitsOnly.length >= 16;
  }

  updateQuantity(productId: number, event: Event): void {
    const quantity = Number((event.target as HTMLInputElement).value);
    if (quantity > 0) {
      this.cartService.updateQuantity(productId, quantity);
    }
  }

  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  submitOrder(): void {
    if (this.isFormValid && !this.isCartEmpty) {
      const orderTotal = this.cartTotal;
      const customerName = this.fullName;

      this.cartService.clearCart();

      this.router.navigate(['/confirmation'], {
        state: {
          name: customerName,
          total: orderTotal
        }
      });
    }
  }
}
