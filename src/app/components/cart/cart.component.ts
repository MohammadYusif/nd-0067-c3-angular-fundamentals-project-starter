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
      this.creditCard.trim().length >= 16
    );
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
