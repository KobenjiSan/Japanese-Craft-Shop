import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../shared/models/product.model';
import { UserResponse } from '../../shared/models/user.model';
import { PaginatedResult } from '../../shared/models/paginated-result.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
    private readonly baseUrl = "http://localhost:5088/api";

    http = inject(HttpClient);

    createProduct(formData: FormData): Observable<Product>{
      return this.http.post<Product>(`${this.baseUrl}/products`, formData);
    }

    deleteProduct(productId: string): Observable<void>{
      return this.http.delete<void>(`${this.baseUrl}/products/${productId}`);
    }

    updateProduct(productId: string, formData: FormData): Observable<Product>{
      return this.http.patch<Product>(`${this.baseUrl}/products/${productId}`, formData);
    }

    getAllUsers(params?: {page?: number; pageSize?: number}): Observable<PaginatedResult<UserResponse>>{
      return this.http.get<PaginatedResult<UserResponse>>(`${this.baseUrl}/users`, {
        params: {
          page: params?.page?.toString() ?? '1',
          pageSize: params?.pageSize?.toString() ?? '25'
        }
      });
    }
  
}
