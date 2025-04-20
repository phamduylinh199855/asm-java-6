import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../models/product.model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  get(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product);
  }

  update(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/${id}`, product);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
