import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { ICreateOrderRequest, IPayPalConfig, NgxPayPalModule } from 'ngx-paypal';
import { environment } from '../../../environments/environment.development';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    NgxPayPalModule,
  ],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.css'
})
export class PaymentsComponent implements OnInit, OnDestroy {
  faArrowLeftLong = faArrowLeftLong;
  isLocastorageAvailable = typeof localStorage !== 'undefined';
  getCartDetails: any = [];
  totalNumber: number = 0;
  showSuccess: Boolean = false;
  showError: Boolean = false;
  showCancel: Boolean = false;
  details: string = '';
  public showPaypalButtons: boolean = false;
  public cartItem:number = 0;

  public payPalConfig? : IPayPalConfig;


  constructor(private cartService: CartService, private router: Router) { }
  ngOnInit(): void {
    this.initConfig();
    this.checkTotal();
    this.isLocastorageAvailable = true;
  }

  cartDetails() {
    if (this.isLocastorageAvailable) {
      if (localStorage.getItem('localCart')) {
        this.getCartDetails = JSON.parse(localStorage.getItem('localCart') || '[]');
        console.log(this.getCartDetails);
      }
    }
  }
  //check localstorage amount total
  checkTotal() {
    if (this.isLocastorageAvailable) {
      if (localStorage.getItem('localCart')) {
        this.getCartDetails = JSON.parse(localStorage.getItem('localCart') || '[]');
        this.totalNumber = this.getCartDetails.reduce(function (acc: any, val: any) {
          const itemAmt = parseFloat(val.price);
          const itemQnt = parseFloat(val.qnt);

          return acc + (itemAmt * itemQnt)
        }, 0)
        console.log(this.totalNumber);
      }
    }
  }
  

  private initConfig(): void {
    this.payPalConfig = {
        currency: 'USD',
        clientId: environment.clientId,
        createOrderOnClient: (data) => < ICreateOrderRequest > {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'USD',
                    value: this.totalNumber.toString(),
                    breakdown: {
                        item_total: {
                            currency_code: 'USD',
                            value: this.totalNumber.toString()
                        }
                    }
                },
                items: this.getCartDetails.map((item:any) =>{
                  return{
                    name: item.name,
                    quantity: item.qnt.toString(),
                    category: 'DIGITAL_GOODS',
                    unit_amount: {
                      currency_code: 'USD',
                      value: item.price.toString()
                    },
                  }
                })
            }]
        },
        advanced: {
            commit: 'true'
        },
        style: {
            label: 'paypal',
            layout: 'vertical'
        },
        onApprove: (data, actions) => {
            console.log('onApprove - transaction was approved, but not authorized', data, actions);
            actions.order.get().then((details: any) => {
                console.log('onApprove - you can get full order details inside onApprove: ', details);
            });

        },
        onClientAuthorization: (data) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', JSON.stringify(data));
            this.showSuccess = true;
            if(this.isLocastorageAvailable){
              if(localStorage.getItem('localCart')){
                this.getCartDetails = [];
                localStorage.removeItem('localCart');
                localStorage.clear();
                this.cartService.cartSubject.next(this.cartItem);
                this.router.navigate(["/home"]);
              }
            }
            

        },
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);
            this.showCancel = true;

        },
        onError: err => {
            console.log('OnError', err);
            this.showError = true;
        },
        onClick: (data, actions) => {
            console.log('onClick', data, actions);
            // this.resetStatus();
        }
    };
}

  placeOrder() { 
    this.showPaypalButtons = true;
  }
 

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
  }

}