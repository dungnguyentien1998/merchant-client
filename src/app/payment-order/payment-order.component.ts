import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { ApiService, Order } from '../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { RefundDialogComponent } from '../refund-dialog/refund-dialog.component';

@Component({
  selector: 'app-payment-order',
  templateUrl: './payment-order.component.html',
  styleUrls: ['./payment-order.component.scss']
})
export class PaymentOrderComponent implements OnInit {
  orderId: string | null = null;
  orders: Order[] = [];
  private apiUrl = environment.apiBaseUrl;

  amount = 10000;
  status = 'Pending';
  loading = false;

  displayedColumns: string[] = ['id', 'status', 'type', 'refundStatus', 'actions'];

  constructor(
    private http: HttpClient,
    private router: Router,
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.apiService.getId().subscribe({
      next: (response) => {
        this.orderId = response.orderId;
        console.log('ID received:', this.orderId);
      },
      error: (error) => {
        console.error('Error fetching ID:', error);
      }
    });

    this.apiService.getOrders().subscribe({
      next: (data) => {
        console.log('Raw API response:', data);
        this.orders = data.orders || [];
        console.log('Orders assigned:', this.orders);
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error fetching orders:', error);
        this.orders = [];
        this.cdr.detectChanges();
      }
    });
  }

  searchTransaction(order: Order) {
    this.apiService.searchTransaction(order.orderId).subscribe({
      next: (response) => {
        console.log("Status: ", response.status);
        this.dialog.open(DialogComponent, {
          data: {
            title: `Search Transaction ${order.orderId}`,
            message: `Transaction status: ${response.status}`
          }
        });
        // Update status in orders array
        const index = this.orders.findIndex(o => o.orderId === order.orderId);
        if (index !== -1) {
          this.orders[index].status = response.status;
          this.orders = [...this.orders]; // Trigger change detection
          this.cdr.detectChanges();
        }
      },
      error: (error) => {
        console.error('Search transaction error:', error);
        this.dialog.open(DialogComponent, {
          data: {
            title: 'Error',
            message: 'Failed to fetch transaction status'
          }
        });
      }
    });
  }

  openRefundDialog(order: Order): void {
    const dialogRef = this.dialog.open(RefundDialogComponent, {
      width: '400px',
      data: { orderId: order.orderId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.apiService.refundTransaction(result.orderId, result.amount).subscribe({
          next: (response) => {
            console.log("Status: ", response.status);
            this.dialog.open(DialogComponent, {
              data: {
                title: `Refund Transaction ${order.orderId}`,
                message: `Refund status: ${response.status}`
              }
            });
            // Update refundStatus in orders array
            const index = this.orders.findIndex(o => o.orderId === response.orderId);
            if (index !== -1) {
              this.orders[index].status = response.status;
              this.orders = [...this.orders]; // Trigger change detection
            } else {
              const newOrder: Order = {
                orderId: response.orderId,
                status: response.status,
                type: 'refund'
              };
              this.orders = [...this.orders, newOrder];
            }
            this.cdr.detectChanges();
          },
          error: (error) => {
            console.error('Refund transaction error:', error);
            this.dialog.open(DialogComponent, {
              data: {
                title: 'Error',
                message: 'Failed to process refund'
              }
            });
          }
        });
      }
    });
  }

  refundTransaction(order: Order) {
    
  }

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
        if (redirectUrl.startsWith('/')) {
          this.router.navigateByUrl(redirectUrl);
        } else {
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
