import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaymentMethodsComponent } from './payment-methods/payment-methods.component';
import { PaymentMethodItemComponent } from './payment-method-item/payment-method-item.component';

@NgModule({
  declarations: [
    AppComponent,
    PaymentMethodsComponent,
    PaymentMethodItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
