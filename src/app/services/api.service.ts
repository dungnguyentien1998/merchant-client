import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

interface IdResponse {
  orderId: string;
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


}
