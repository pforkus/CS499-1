import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class Items {

  private url = `${environment.apiUrl}/items`;

  constructor(private http: HttpClient) {}

  getItems(params: any) {
    return this.http.get<{ items: any[]; pagination: any }>(this.url, { params });
  }

  getItem(id: string) {
  return this.http.get<any>(`${this.url}/${id}`);
  }

  getCategories() {
    return this.http.get<string[]>(`${this.url}/categories`);
  }

  deleteItem(id: string) {
    return this.http.delete(`${this.url}/${id}`);
  }

  deleteItems(ids: string[]) {
    return this.http.post(`${this.url}/delete-many`, { ids });
  }

  updateItem(id: string, item: any) {
    return this.http.put(`${this.url}/${id}`, item);
  }

  addItem(item: any) {
    return this.http.post(this.url, item);
  }
}