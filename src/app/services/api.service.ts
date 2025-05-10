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
  refundStatus?: number;
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
  orderId: string;
  status: number;
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
    return this.http.post<StatusResponse>(`${this.apiUrl}/merchant/paygate/search-transaction`, { orderId });
  }

  refundTransaction(originalRequestId: string): Observable<RefundResponse> {
    return this.http.post<RefundResponse>(`${this.apiUrl}/merchant/paygate/refund-transaction`, { originalRequestId });
  }
}
