import { CommonModule } from '@angular/common';
import { parseHostBindings } from '@angular/compiler';
import { Component } from '@angular/core';
import { parse } from 'path';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
   CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
 
  constructor(private cartService: CartService){}
  /** check for localstorage */
  private isLocastorageAvailable = typeof localStorage !== 'undefined';
  public cartItem:number = 0;

  cartFunction(){
    if(this.isLocastorageAvailable){
      if(localStorage.getItem('localCart') !=null){
        let countCart = JSON.parse(localStorage.getItem('localCart') || '[]');
        this.cartItem = countCart.length;
        this.cartService.cartSubject.next(this.cartItem);
      }
    }
  }
  
  dec(prod:any){
    if(prod.qnt != 1){
      prod.qnt -=1;
    }else{
      alert("Quantity can not be below 1")
    }
  }
  inc(prod:any){
    if(prod.qnt !=5){
      prod.qnt +=1;
    }else{
      alert("can not be more than 5");
    }
  }
  
  itemCarts:any = []; //global variable

  addToCart(prod:any){
    if(this.isLocastorageAvailable){
      let cartDataNull = localStorage.getItem('localCart');
      if(cartDataNull === null){
        let storeDataGet:any = [];
        storeDataGet.push(prod);
        localStorage.setItem('localCart', JSON.stringify(storeDataGet))
      }else{
        let id = prod.id;
        let index:number = -1;
        this.itemCarts = JSON.parse(localStorage.getItem('localCart') || '[]');
        for(let i=0; i < this.itemCarts.length; i++){
          if(parseInt(id) === parseInt(this.itemCarts[i].id)){
            this.itemCarts[i].qnt = prod.qnt;
            index = i;
            break;
          }
        }

        if(index === -1){
          this.itemCarts.push(prod);
          localStorage.setItem('localCart', JSON.stringify(this.itemCarts));
        }else{
          localStorage.setItem('localCart', JSON.stringify(this.itemCarts));
        }

      }
      this.cartFunction();
    }
  }

  productArray = [
    {
      id: 1,
      img: 'https://images-na.ssl-images-amazon.com/images/I/31WbGp9tLkL.jpg',
      qnt: 1,
      price: 400
    },
    {
      id: 2,
      img: 'https://i.pinimg.com/564x/88/69/b9/8869b95556bb48225fdd65c1e03ef39e.jpg',
      qnt: 1,
      price: 800
    },
    {
      id: 3,
      img: 'https://www.zoro.com/static/cms/product/full/Z1vs6vpcpEx_.JPG',
      qnt: 1,
      price: 150
    },
    {
      id: 4,
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8VZG3FGzw09m-Y6PrZqNtsYb-pgAMihVC-0BoOzd-HcaRF9G0eFIuLA2Eegt2Jp5Unys&usqp=CAU',
      qnt: 1,
      price: 80
    }
  ]


}
