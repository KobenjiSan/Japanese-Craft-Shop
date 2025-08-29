import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../shared/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
    private readonly baseUrl = "http://localhost:5088/api/products";

    http = inject(HttpClient);

    createProduct(formData: FormData): Observable<Product>{
      return this.http.post<Product>(this.baseUrl, formData);
    }

    deleteProduct(productId: string): Observable<void>{
      return this.http.delete<void>(`${this.baseUrl}/${productId}`);
    }

    updateProduct(productId: string, formData: FormData): Observable<Product>{
      return this.http.patch<Product>(`${this.baseUrl}/${productId}`, formData);
    }
  
}
