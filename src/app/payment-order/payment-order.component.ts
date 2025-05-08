import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-payment-order',
  templateUrl: './payment-order.component.html',
  styleUrls: ['./payment-order.component.scss']
})
export class PaymentOrderComponent implements OnInit {
  orderId: string | null = null;
  private apiUrl = environment.apiBaseUrl;

  ngOnInit(): void {
    this.apiService.getId().subscribe({
      next: (response) => {
        this.orderId = response.orderId; // Assign the ID to the component instance
        console.log('ID received:', this.orderId);
      },
      error: (error) => {
        console.error('Error fetching ID:', error);
      }
    });
  }

  amount = 10000;

  status = 'Pending';
  loading = false;

  constructor(private http: HttpClient, private router: Router, private apiService: ApiService) {}

  submitPayment() {
    this.loading = true;

    const payload = {
      orderId: this.orderId,
      transAmount: this.amount
    };

    this.http.post<{ url: string }>(`${this.apiUrl}/merchant/paygate/create-transaction`, payload).subscribe({
      next: (response) => {
        const redirectUrl = response.url;
        this.status = 'Init';
        this.loading = false;
        console.log("url: ", redirectUrl);

        // Check if the URL is internal or external
        if (redirectUrl.startsWith('/')) {
          // Internal route (e.g., '/some-route')
          console.log(1);
          this.router.navigateByUrl(redirectUrl);
        } else {
          // External URL (e.g., 'https://example.com')
          console.log(2);
          window.location.href = redirectUrl;
        }
      },
      error: (error) => {
        this.status = 'Failed';
        this.loading = false;
        console.error('Error fetching redirect URL:', error);
      },
    });
  }

  cancel() {
    alert('Cancel');
  }

  get statusColor(): 'primary' | 'accent' | 'warn' | undefined {
    switch (this.status) {
      case 'Success': return 'primary';
      case 'Pending': return 'accent';
      case 'Failed': return 'warn';
      default: return undefined;
    }
  }

}
