import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash, faTrashAlt, faArrowRightLong } from '@fortawesome/free-solid-svg-icons'
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    FontAwesomeModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  faTrash = faTrash;
  faTrashAlt = faTrashAlt;
  faArrowRightLong = faArrowRightLong;
  isLocastorageAvailable = typeof localStorage !== 'undefined';
  getCartDetails:any = [];
  totalNumber:number = 0;
  public cartItem:number = 0;

  constructor(private cartService: CartService){}
  ngOnInit(): void {
    this.cartDetails();
    this.loadCart();
  }

  cartDetails(){
    if(this.isLocastorageAvailable){
      if(localStorage.getItem('localCart')){
        this.getCartDetails = JSON.parse(localStorage.getItem('localCart') || '[]');
        console.log(this.getCartDetails);
      }
    }
  }

  incQty(id:any, qnt:any){
    for(let i= 0; i < this.getCartDetails.length; i++){
      if(this.getCartDetails[i].id === id){
        if(qnt !=5){
          this.getCartDetails[i].qnt = parseInt(qnt)+1;
          
        }else{
          alert("Can not be more than 5")
        }
      }
    }

    localStorage.setItem('localCart', JSON.stringify(this.getCartDetails));
    this.loadCart();
  }

  decQty(id:any, qnt:any){
    for(let i= 0; i < this.getCartDetails.length; i++){
      if(this.getCartDetails[i].id === id){
        if(qnt !=1){
          this.getCartDetails[i].qnt = parseInt(qnt)-1;
          
        }else{
          alert("Can not be less than 1")
        }
      }
    }

    localStorage.setItem('localCart', JSON.stringify(this.getCartDetails))
    this.loadCart();
  }

  loadCart(){
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

  removeAll(){
    if(this.isLocastorageAvailable){
      if(localStorage.getItem('localCart')){
        localStorage.removeItem('localCart');
        localStorage.clear();
        this.getCartDetails = [];
        this.totalNumber = 0;
        this.cartService.cartSubject.next(this.cartItem)
        console.log('Cart has been cleared');
      }
    }
  }

  singleDelete(item:any){
    if(this.isLocastorageAvailable){
      if(localStorage.getItem('localCart')){
        this.getCartDetails = JSON.parse(localStorage.getItem('localCart') || '[]');
        for(let i = 0; i < this.getCartDetails.length; i++){
          if(this.getCartDetails[i].id === item){
            this.getCartDetails.splice(i, 1);
            localStorage.setItem('localCart', JSON.stringify(this.getCartDetails));
            this.loadCart();
            this.cartFunction();
          }
        }
      }
    }
  }

  cartFunction(){
    if(this.isLocastorageAvailable){
      if(localStorage.getItem('localCart') !=null){
        let countCart = JSON.parse(localStorage.getItem('localCart') || '[]');
        this.cartItem = countCart.length;
        this.cartService.cartSubject.next(this.cartItem);
      }
    }
  }
}