import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product';

// Interface for the event data emitted when adding to cart
export interface AddToCartEvent {
  product: Product;
  quantity: number;
}

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {
  // @Input: Receives product data from parent component
  @Input() product!: Product;

  // @Output: Emits event to parent when user clicks "Add to Cart"
  @Output() addToCartEvent = new EventEmitter<AddToCartEvent>();

  quantity = 1;

  addToCart(): void {
    // Emit event to parent component with product and quantity
    this.addToCartEvent.emit({
      product: this.product,
      quantity: this.quantity
    });
    this.quantity = 1;
  }
}
