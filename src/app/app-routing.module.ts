import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentMethodsComponent } from './payment-methods/payment-methods.component';
import { PaymentOrderComponent } from './payment-order/payment-order.component';
import { TransactionResultComponent } from './transaction-result/transaction-result.component';

const routes: Routes = [
  { path: '', redirectTo: 'methods', pathMatch: 'full' },
  { path: 'methods', component: PaymentMethodsComponent },
  { path: 'order', component: PaymentOrderComponent },
  { path: 'transaction-result', component: TransactionResultComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
