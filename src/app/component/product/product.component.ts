import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductResponseModel } from 'src/app/models/productResponseModel';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {

  products: Product[] = [];
  dataLoaded=false;
  
  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.getProdcuts();
  }

  getProdcuts() {
    this.productService.getProdcuts().subscribe((response)=>{
      this.products=response.data
      this.dataLoaded=true;
    })
  }
}
