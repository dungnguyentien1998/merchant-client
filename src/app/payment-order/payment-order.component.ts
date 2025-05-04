import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-payment-order',
  templateUrl: './payment-order.component.html',
  styleUrls: ['./payment-order.component.scss']
})
export class PaymentOrderComponent implements OnInit {
  private apiUrl = environment.apiBaseUrl;

  ngOnInit(): void {
  }

  orderId = 'ORD123456';
  amount = 99.99;
  description = 'Thanh toan don hang'
  status = 'Pending';
  loading = false;

  constructor(private http: HttpClient, private router: Router) {}

  submitPayment() {
    this.loading = true;

    const payload = {
      orderId: this.orderId,
      transAmount: this.amount,
      description: this.description
    };

    this.http.post<{ url: string }>(`${this.apiUrl}/merchant/paygate/create-transaction`, payload).subscribe({
      next: (response) => {
        const redirectUrl = response.url;
        this.status = 'Init';
        this.loading = false;

        // Check if the URL is internal or external
        if (redirectUrl.startsWith('/')) {
          // Internal route (e.g., '/some-route')
          this.router.navigateByUrl(redirectUrl);
        } else {
          // External URL (e.g., 'https://example.com')
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
