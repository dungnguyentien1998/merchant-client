import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { ApiService, Order } from '../services/api.service';

@Component({
  selector: 'app-payment-order',
  templateUrl: './payment-order.component.html',
  styleUrls: ['./payment-order.component.scss']
})
export class PaymentOrderComponent implements OnInit {
  orderId: string | null = null;
  orders: Order[] = []; // Initialize as empty array

  amount = 10000;
  status = 'Pending';
  loading = false;

  // Columns for mat-table
  displayedColumns: string[] = ['orderId', 'status', 'type'];

  constructor(
    private http: HttpClient,
    private router: Router,
    private apiService: ApiService,
    private cdr: ChangeDetectorRef // For manual change detection
  ) {}

  ngOnInit(): void {
    // Fetch orderId
    this.apiService.getId().subscribe({
      next: (response) => {
        this.orderId = response.orderId;
        console.log('ID received:', this.orderId);
      },
      error: (error) => {
        console.error('Error fetching ID:', error);
      }
    });

    // Fetch orders
    this.apiService.getOrders().subscribe({
      next: (data) => {
        console.log('Raw API response:', data); // Debug: Log raw response
        this.orders = data.orders || []; // Ensure orders is an array
        console.log('Orders assigned:', this.orders); // Debug: Log assigned data
        this.cdr.detectChanges(); // Force change detection
      },
      error: (error) => {
        console.error('Error fetching orders:', error);
        this.orders = []; // Clear on error
        this.cdr.detectChanges();
      }
    });
  }

  submitPayment() {
    this.loading = true;

    const payload = {
      orderId: this.orderId,
      transAmount: this.amount
    };

    this.apiService.createTransaction(payload).subscribe({
      next: (response) => {
        const redirectUrl = response.url;
        this.status = 'Init';
        this.loading = false;
        console.log("url: ", redirectUrl);

        if (redirectUrl.startsWith('/')) {
          console.log(1);
          this.router.navigateByUrl(redirectUrl);
        } else {
          console.log(2);
          window.location.href = redirectUrl;
        }
      },
      error: (error) => {
        this.status = 'Failed';
        this.loading = false;
        console.error('Error fetching redirect URL:', error);
      }
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
