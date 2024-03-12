import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    FontAwesomeModule,
    RouterModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  faCartPlus = faCartPlus;
  public cartItem:number = 0;
  /** check for localstorage */
  isLocastorageAvailable = typeof localStorage !== 'undefined';
  constructor(private cartService: CartService){
    this.cartService.cartSubject.subscribe((data) =>{
      this.cartItem = data;
    })
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.cartFunction();
  }
  
  //count the cart items
  cartFunction(){
    if(this.isLocastorageAvailable){
      if(localStorage.getItem('localCart') !=null){
        let countCart = JSON.parse(localStorage.getItem('localCart') || '[]');
        this.cartItem = countCart.length;
      }
    }
  }
  
}
