import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentMethodsComponent } from './payment-methods/payment-methods.component';
import { PaymentOrderComponent } from './payment-order/payment-order.component';

const routes: Routes = [
  { path: '', redirectTo: 'methods', pathMatch: 'full' },
  { path: 'methods', component: PaymentMethodsComponent },
  { path: 'order', component: PaymentOrderComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
