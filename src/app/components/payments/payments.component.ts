import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeftLong} from '@fortawesome/free-solid-svg-icons';
import { ICreateOrderRequest, IPayPalConfig, NgxPayPalModule } from 'ngx-paypal';
import { environment } from '../../../environments/environment.development';

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
export class PaymentsComponent {
  faArrowLeftLong = faArrowLeftLong;
  isLocastorageAvailable = typeof localStorage !== 'undefined';
  getCartDetails: any = [];
  totalNumber:number = 0;
  showSuccess:Boolean = false;
  showError:Boolean = false;
  showCancel:Boolean = false;
  details:string = '';
  
  public payPalConfig ? : IPayPalConfig;


  constructor(){}
  ngOnInit(): void {
    this.checkTotal();
    this.initConfig();
  }

  cartDetails(){
    if(this.isLocastorageAvailable){
      if(localStorage.getItem('localCart')){
        this.getCartDetails = JSON.parse(localStorage.getItem('localCart') || '[]');
        console.log(this.getCartDetails);
      }
    }
  }
  //check localstorage amount total
  checkTotal(){
    if(this.isLocastorageAvailable){
      if(localStorage.getItem('localCart')){
        this.getCartDetails = JSON.parse(localStorage.getItem('localCart') || '[]');
        this.totalNumber = this.getCartDetails.reduce(function(acc:any, val:any){
          const itemAmt = parseFloat(val.price);
          const itemQnt = parseFloat(val.qnt);
          
          return acc + (itemAmt * itemQnt)
        }, 0)
        console.log(this.totalNumber);
      }
    }
  }
  

  placeOrder(){}
  private initConfig(){
    this.payPalConfig = {
        currency: 'EUR',
        clientId: environment.clientId,
        createOrderOnClient: (data) => < ICreateOrderRequest > {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'EUR',
                    value: '9.99',
                    breakdown: {
                        item_total: {
                            currency_code: 'EUR',
                            value: '9.99'
                        }
                    }
                },
                items: [{
                    name: 'Enterprise Subscription',
                    quantity: '1',
                    category: 'DIGITAL_GOODS',
                    unit_amount: {
                        currency_code: 'EUR',
                        value: '9.99',
                    },
                }]
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
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
            this.showSuccess = true;
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

}