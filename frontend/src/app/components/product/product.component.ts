import {Component, OnInit} from '@angular/core';
import {Product} from '../../models/product.model';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  newProduct: Product = {name: '', price: 0, description: ''};
  editingProduct: Product | null = null;

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAll().subscribe(data => this.products = data);
  }

  saveProduct() {
    if (this.editingProduct) {
      this.productService.update(this.editingProduct.id!, this.newProduct).subscribe(() => {
        this.cancelEdit();
        this.loadProducts();
      });
    } else {
      this.productService.create(this.newProduct).subscribe(() => {
        this.newProduct = {name: '', price: 0, description: ''};
        this.loadProducts();
      });
    }
  }

  editProduct(product: Product) {
    this.editingProduct = product;
    this.newProduct = {...product};
  }

  cancelEdit() {
    this.editingProduct = null;
    this.newProduct = {name: '', price: 0, description: ''};
  }

  deleteProduct(id: number) {
    this.productService.delete(id).subscribe(() => this.loadProducts());
  }
}
