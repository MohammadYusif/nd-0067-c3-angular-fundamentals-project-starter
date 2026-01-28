import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private dataUrl = 'assets/data.json';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.dataUrl);
  }

  getProduct(id: number): Observable<Product | undefined> {
    return new Observable((observer) => {
      this.getProducts().subscribe({
        next: (products) => {
          const product = products.find((p) => p.id === id);
          observer.next(product);
          observer.complete();
        },
        error: (err) => observer.error(err)
      });
    });
  }
}
