import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { PaymentsComponent } from './components/payments/payments.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'cart', component: CartComponent},
    {path: 'invoice', component: InvoiceComponent},
    {path: 'payments', component: PaymentsComponent},
    {path: '', redirectTo: 'home', pathMatch: 'full'}
];
