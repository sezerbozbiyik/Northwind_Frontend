import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {

  products: Product[] = [];
  dataLoaded = false;
  filterText: "";

  constructor(private productService: ProductService, private activetedRoute: ActivatedRoute, private toastrService: ToastrService, private cartService: CartService) { }

  ngOnInit(): void {

    this.activetedRoute.params.subscribe(params => {
      if (params["categoryId"]) {
        this.getProductsByCategory(params["categoryId"]);
      }
      else {
        this.getProducts();
      }
    })
  }

  getProducts() {
    this.productService.getProdcuts().subscribe((response) => {
      this.products = response.data
      this.dataLoaded = true;
    })
  }

  getProductsByCategory(categoryId: number) {
    this.productService.getProductsByCategory(categoryId).subscribe((response) => {
      this.products = response.data
      this.dataLoaded = true;
    })
  }

  addToCart(product: Product) {
    if (product.unitsInStock === 0) {
      this.toastrService.error("Hata", "Stokta yok")
    } else {
      this.toastrService.success("Ürün eklendi", product.productName)
      this.cartService.addToCart(product)
    }
  }
}
