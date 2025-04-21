import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PaymentMethod } from '../models/payment-method.model';

@Component({
  selector: 'app-payment-method-item',
  templateUrl: './payment-method-item.component.html',
  styleUrls: ['./payment-method-item.component.scss']
})
export class PaymentMethodItemComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() method!: PaymentMethod;
  @Output() add = new EventEmitter<PaymentMethod>();

}
