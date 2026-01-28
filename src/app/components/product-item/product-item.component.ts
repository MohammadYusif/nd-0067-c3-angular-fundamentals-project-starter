import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {
  @Input() product!: Product;
  quantity = 1;

  constructor(private cartService: CartService) {}

  addToCart(): void {
    this.cartService.addToCart(this.product, this.quantity);
    this.quantity = 1;
  }
}
