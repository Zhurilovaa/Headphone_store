export class Product {
    img: string = "";
    title: string ="";
    price: number = 0.0;
    rate: number = 0.0;
    is_wired = false;
    count_in_basket = 0;

    constructor(new_img: string, new_title: string, new_price: number, new_rate: number, new_wired: boolean) {
        this.img = new_img;
        this.title = new_title;
        this.price = new_price;
        this.rate = new_rate;
        this.is_wired = new_wired;
    }

    getFieldByKey (param: string): number | string | boolean{
        switch (param){
            case "img":
                return this.img;
            case "title":
                return this.title;
            case "price":
                return this.price;
            case "rate":
                return this.rate;
            case "is_wired":
                return this.is_wired;
            case "count_in_basket":
                return this.count_in_basket;
            default:
                break;
        }
        return -1;        
    }
}
