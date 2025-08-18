import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../shared/models/product.model';
import { PaginatedResult } from '../../shared/models/paginated-result.model';
import { LikedByUserResponse } from '../../shared/models/liked-by-user.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly baseUrl = "http://localhost:5088/api/products";

  http = inject(HttpClient);

  getAllProducts(params?: {page?: number; pageSize?: number, category?: string; 
                          minPrice?: number, maxPrice?: number, stock?: boolean, 
                          featured?: boolean, newest?: boolean}): Observable<PaginatedResult<Product>>{
    return this.http.get<PaginatedResult<Product>>(this.baseUrl, {
      params: {
        page: params?.page?.toString() ?? '1',
        pageSize: params?.pageSize?.toString() ?? '10',
        category: params?.category || '',
        minPrice: params?.minPrice?.toString() ?? '0',
        maxPrice: params?.maxPrice?.toString() ?? '150',
        stock: params?.stock?.toString() ?? 'false',
        featured: params?.featured?.toString() ?? 'false',
        newest: params?.newest?.toString() ?? 'false',
      }
    });
  }

  getProductById(id: string): Observable<Product>{
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  getProductLikedByList(id: string): Observable<LikedByUserResponse>{
    return this.http.get<LikedByUserResponse>(`${this.baseUrl}/likedByList/${id}`);
  }
}
