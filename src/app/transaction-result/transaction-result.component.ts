import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-transaction-result',
  templateUrl: './transaction-result.component.html',
  styleUrls: ['./transaction-result.component.scss']
})
export class TransactionResultComponent implements OnInit {
  private apiUrl = environment.apiBaseUrl;

  transactionDetails: {
    orderId: string;
    transactionStatus: string;
    signature: string;
    merchantCode: string;
    transAmount: number;
    fee: number;
    discount: number;
    totalAmount: number;
    vtRequestId: number;
    errorCode: string;
    paymentMethod: string;
    bank: string;
    isValidSignature: boolean;
  } | null = null;
  error: string | null = null;
  loading = false;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    // Extract query parameters
    this.route.queryParams.subscribe((params) => {
      const orderId = params['orderId'];
      const transactionStatus = params['transactionStatus'];
      const signature = params['signature'];
      const merchantCode = params['merchantCode'];
      const transAmount = params['transAmount'];
      const fee = params['fee'];
      const discount = params['discount'];
      const totalAmount = params['totalAmount'];
      const vtRequestId = params['vtRequestId'];
      const errorCode = params['errorCode'];
      const paymentMethod = params['paymentMethod'];
      const bank = params['bank'];

      if (!orderId || !transactionStatus || !signature) {
        this.error = 'Missing required parameters';
        return;
      }

      // Verify signature (example: call backend API to validate)
      this.verifySignature(orderId, transactionStatus, signature, merchantCode, transAmount, fee, discount, totalAmount,
        vtRequestId, errorCode, paymentMethod, bank).subscribe({
        next: (isValid) => {
          this.transactionDetails = {
            orderId,
            transactionStatus,
            signature,
            merchantCode,
            transAmount,
            fee,
            discount,
            totalAmount,
            vtRequestId,
            errorCode,
            paymentMethod,
            bank,
            isValidSignature: isValid,
          };
          this.loading = false;
        },
        error: () => {
          this.error = 'Failed to verify transaction';
          this.loading = false;
        },
      });
    });
  }

  // Example: Verify signature by calling your backend
  private verifySignature(orderId: string, transactionStatus: string, signature: string, merchantCode: string, transAmount: number,
    fee: number, discount: number, totalAmount: number, vtRequestId: string, errorCode: string, paymentMethod: string, bank: string
  ) {
    const payload = { orderId, transactionStatus, signature, merchantCode, transAmount, fee, discount,
      totalAmount, vtRequestId, errorCode, paymentMethod, bank };
    // Replace with your backend endpoint to verify signature
    return this.http.post<boolean>(`${this.apiUrl}/merchant/common/verify-signature`, payload);
  }

}
