import { Component, OnInit } from '@angular/core';
import { PaymentMethod } from '../models/payment-method.model';

@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.scss']
})
export class PaymentMethodsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

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
  }

  openWalletDetail() {
    alert('Phương thức thanh toán thẻ nội địa');
  }

}
