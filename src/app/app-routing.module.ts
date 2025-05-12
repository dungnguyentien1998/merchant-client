import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentMethodsComponent } from './payment-methods/payment-methods.component';
import { PaymentOrderComponent } from './payment-order/payment-order.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { TransactionResultComponent } from './transaction-result/transaction-result.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'methods', component: PaymentMethodsComponent, canActivate: [AuthGuard] },
  { path: 'order', component: PaymentOrderComponent, canActivate: [AuthGuard] },
  { path: 'transaction-result', component: TransactionResultComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
