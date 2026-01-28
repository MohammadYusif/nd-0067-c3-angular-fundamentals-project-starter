import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cart-item';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);

  cart$ = this.cartSubject.asObservable();

  private notificationSubject = new BehaviorSubject<string>('');
  notification$ = this.notificationSubject.asObservable();

  getCartItems(): CartItem[] {
    return this.cartItems;
  }

  getCartCount(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  getCartTotal(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }

  addToCart(product: Product, quantity: number): void {
    const existingItem = this.cartItems.find(
      (item) => item.product.id === product.id
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cartItems.push({ product, quantity });
    }

    this.cartSubject.next([...this.cartItems]);
    this.showNotification(`${product.name} added to cart!`);
  }

  updateQuantity(productId: number, quantity: number): void {
    const item = this.cartItems.find((item) => item.product.id === productId);
    if (item) {
      item.quantity = quantity;
      this.cartSubject.next([...this.cartItems]);
    }
  }

  removeFromCart(productId: number): void {
    const item = this.cartItems.find((item) => item.product.id === productId);
    this.cartItems = this.cartItems.filter(
      (item) => item.product.id !== productId
    );
    this.cartSubject.next([...this.cartItems]);
    if (item) {
      this.showNotification(`${item.product.name} removed from cart`);
    }
  }

  clearCart(): void {
    this.cartItems = [];
    this.cartSubject.next([]);
  }

  private showNotification(message: string): void {
    this.notificationSubject.next(message);
    setTimeout(() => {
      this.notificationSubject.next('');
    }, 3000);
  }
}
