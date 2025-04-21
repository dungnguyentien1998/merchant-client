import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-payment-order',
  templateUrl: './payment-order.component.html',
  styleUrls: ['./payment-order.component.scss']
})
export class PaymentOrderComponent implements OnInit {

  ngOnInit(): void {
  }

  orderId = 'ORD123456';
  amount = 99.99;
  status = 'Pending';
  loading = false;

  constructor(private http: HttpClient) {}

  submitPayment() {
    this.loading = true;

    const payload = {
      orderId: this.orderId,
      amount: this.amount
    };

    alert('Gọi api khởi tạo');

    // this.http.post('https://your-backend-api.com/api/payment', payload)
    //   .subscribe({
    //     next: (res: any) => {
    //       this.status = 'Paid';
    //       this.loading = false;
    //     },
    //     error: (err) => {
    //       console.error('Payment failed:', err);
    //       this.status = 'Failed';
    //       this.loading = false;
    //     }
    //   });
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
