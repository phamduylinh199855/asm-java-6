import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Product} from '../../models/product.model';
import {ProductService} from '../../services/product.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.productService.getAll().subscribe(data => {
      this.products = data;
    });
  }

}
