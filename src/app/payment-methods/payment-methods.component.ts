import { Component, OnInit } from '@angular/core';
import { PaymentMethod } from '../models/payment-method.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.scss']
})
export class PaymentMethodsComponent implements OnInit {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
  }

  status = 'Pending';
  loading = false;

  linkedWallet = {
    name: 'Thẻ nội địa NAPAS',
    icon: 'assets/icons/debit.png'
  };

  paymentSuggestions: PaymentMethod[] = [
    { name: 'Viettel Money', icon: 'assets/icons/vtm.png' },
    { name: 'Thẻ tín dụng', icon: 'assets/icons/credit.png' }
  ];

  onAdd(method: PaymentMethod) {
    alert(`Thêm phương thức: ${method.name}`);
    this.loading = true;

    const payload = {
      paymentMethod: "eWALLET",
      provider: "VTM",
      paymentInstrument: "84123456789"
    };

    this.http.post<{ url: string }>(`${this.apiUrl}/merchant/link/init`, payload).subscribe({
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

  openWalletDetail() {
    alert('Phương thức thanh toán thẻ nội địa');
  }

}
