import { Component } from '../component';
import html from './catalog.tpl.html';
import { sendEvent } from '../../utils/helpers';
import { ProductList } from '../productList/productList';

class Catalog extends Component {
  productList: ProductList;

  constructor(props: any) {
    super(props);

    this.productList = new ProductList();
    this.productList.attach(this.view.products);
  }

  async render() {
    const productsResp = await fetch('/api/getProducts');
    const products = await productsResp.json();
    this.productList.update(products);
    sendEvent('route', { url: window.location.href });
  }
}

export const catalogComp = new Catalog(html);
