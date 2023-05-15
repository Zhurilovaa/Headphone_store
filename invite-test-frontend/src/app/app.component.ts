import { Component } from '@angular/core';
import { Product } from './product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  // массив продуктов магазина
  list_products_no_wired: Product[] = [];
  list_products_wired: Product[] = [];
  list_products_in_basket: Product[] = [];
  count_favourites: number = 0;
  count_basket: number = 0;
  page: string = "list";
  price: number = 0.0;


  constructor(private router: Router){
    this.fillProduct();
    if(router.url.includes("basket")){
      this.page = "basket";
    } else if (router.url.includes("qpick")){
      this.page = "list";
    }    
  }

  fillProduct(){
    const img: string[] = ["/assets/image-1.png", "/assets/image-2.png", "/assets/image-3.png",
      "/assets/image-4.png", "/assets/image-5.png", "/assets/image-6.png",
      "/assets/image-7.png", "/assets/image-8.png","/assets/image-9.png"  ];

    const title: string[] = ["Apple EarPods", "Apple BYZ S852I", "Samsung EO-HS1303WEGRU",  "JBL Tune 510BT",
      "Sony WH-1000XM4","Samsung Galaxy Buds2 Pro", "Apple AirPods 2", "Apple AirPods 3", "Sony WF-1000XM4"];

    const prise: number[] = [2327, 2927, 999, 4499, 21662, 13490, 12390, 17990, 14318];

    const rate: number[] = [4.5, 4.7, 4.5, 4.8, 4.2, 4.9, 4.9, 5.0, 4.6 ];

    const wired: boolean[] = [true, true, true, false, false, false, false, false, false];

    for (let i: number = 0; i < img.length; i++) {
      const tempProduct = new Product(img[i], title[i], prise[i], rate[i], wired[i]);
      if(tempProduct.is_wired === true){
          this.list_products_wired.push(tempProduct);
      } else{
        this.list_products_no_wired.push(tempProduct);
      }      
    }
  }

  pageChange(new_page: string) {
    if(new_page.includes("basket")){
      this.page = "basket";
    } else if (new_page.includes("qpick")){
      this.page = "list";
    }  
  }

  buyProduct(pr: Product){
    this.count_basket +=1;
    const index = this.list_products_in_basket.findIndex(prod => prod.img == pr.img);
    if (index == -1) {
      const newProduct = new Product(pr.img, pr.title, pr.price, pr.rate, pr.is_wired);
      newProduct.count_in_basket += 1;
      this.list_products_in_basket.push(newProduct);
    } else{
      this.list_products_in_basket[index].count_in_basket += 1;
    }   
    this.price += pr.price; 
  }

  subProduct(pr: Product){
    const index = this.list_products_in_basket.indexOf(pr,0);
    this.list_products_in_basket[index].count_in_basket -= 1;
    if(this.list_products_in_basket[index].count_in_basket === 0) {      
      this.list_products_in_basket.splice(index, 1);
    }
    this.price -= pr.price;
    this.count_basket -=1;
  }

  deleteProduct(pr: Product){
    const index = this.list_products_in_basket.indexOf(pr,0);
    this.price -= (pr.price*pr.count_in_basket);
    this.list_products_in_basket[index].count_in_basket = 0;
    this.list_products_in_basket.splice(index, 1);    
  }

  addProduct(pr: Product){
    const index = this.list_products_in_basket.indexOf(pr,0);
    this.list_products_in_basket[index].count_in_basket += 1; 
    this.price += pr.price; 
    this.count_basket +=1;  
  }

  getSize(){
    return this.list_products_in_basket.length;
  }

  payAllProduct(){
    this.price = 0.0;
    this.count_basket = 0;
    this.list_products_in_basket.splice(0, this.list_products_in_basket.length);
  }
}
