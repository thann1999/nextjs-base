import { ProductList } from '#interfaces/product.interface';
import httpService from '#services/http/http.service';

export class ProductAPI {
  static getListProduct() {
    return httpService.get<ProductList>('https://dummyjson.com/products');
  }
}
