import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    FontAwesomeModule
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  faTrash = faTrash;
  faTrashAlt = faTrashAlt
}
