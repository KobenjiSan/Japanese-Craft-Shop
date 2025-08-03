import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../shared/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly baseUrl = "http://localhost:5088/api/products";

  http = inject(HttpClient);

  getAllProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl);
  }
}
