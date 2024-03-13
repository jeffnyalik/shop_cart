import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMoneyCheckAlt} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule
  ],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css'
})
export class InvoiceComponent {
  isLocastorageAvailable = typeof localStorage !== 'undefined';
  getCartDetails: any = [];
  totalNumber:number = 0;
  faMoneyCheckAlt = faMoneyCheckAlt;

  ngOnInit(): void {
    this.checkTotal();
  }
  // @HostListener('document:contextmenu', ['$event'])
  onRightClick(event: MouseEvent){
    event.preventDefault();
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
}
