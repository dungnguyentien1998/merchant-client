import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

interface IdResponse {
  orderId: string;
}

export interface Order {
  orderId: string;
  status: number;
  type: string;
}

export interface OrderResponse {
  orders: Order[];
}

export interface CreateTransRequest {
  orderId: string | null;
  transAmount: number;
}

export interface CreateTransResponse {
  url: string;
}

export interface StatusResponse {
  orderId: string;
  status: number;
}

export interface RefundResponse {

}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getId(): Observable<IdResponse> {
    return this.http.get<IdResponse>(`${this.apiUrl}/merchant/common/id`);
  }

  getOrders(): Observable<OrderResponse> {
    return this.http.get<OrderResponse>(`${this.apiUrl}/merchant/common/orders`);
  }

  createTransaction(payload: CreateTransRequest): Observable<CreateTransResponse> {
    return this.http.post<CreateTransResponse>(`${this.apiUrl}/merchant/paygate/create-transaction`, payload)
  }

  searchTransaction(orderId: string): Observable<StatusResponse> {
    return this.http.post<StatusResponse>(`${this.apiUrl}/api/search-transaction`, { orderId });
  }

  refundTransaction(orderId: number): Observable<{ refundStatus: string }> {
    return this.http.post<{ refundStatus: string }>(`${this.apiUrl}/api/refund-transaction`, { orderId });
  }
}
