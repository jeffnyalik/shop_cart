import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    FontAwesomeModule,
    CommonModule
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  faTrash = faTrash;
  faTrashAlt = faTrashAlt;
  isLocastorageAvailable = typeof localStorage !== 'undefined';
  getCartDetails:any = [];

  constructor(){}
  ngOnInit(): void {
    this.cartDetails();
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

    localStorage.setItem('localCart', JSON.stringify(this.getCartDetails))
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
  }
}
