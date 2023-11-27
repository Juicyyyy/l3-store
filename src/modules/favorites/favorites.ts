import { Component } from '../component';
import html from './favorites.tpl.html';
import { ProductData } from 'types';
import { formatPrice } from '../../utils/helpers';
import { cartService } from '../../services/cart.service';

export class Favorites extends Component {
    products!: ProductData[];

    async init() {
        const favoritesLink = document.querySelector('.favoritesLink');
        this.products = await cartService.getFav();
        
        if (this.products.length < 1) {
            favoritesLink?.classList.add('checkout__empty');
            return;
        } else {
            favoritesLink?.classList.remove('checkout__empty');
        }
    }

    async render() {
        const favoritesContainer = this.view.favoritesWrapper;

        this.products.forEach((product) => {
            const productHTML = `
            <a class="product" href="/product?id=${product.id}">
                <div class="product__img">
                    <img data-tag="img" src="${product.src}">
                </div>
            
                <span class="product__info">
                    <h3 class="product__title" data-tag="title">${product.name}</h3>
                    <p class="product__price" data-tag="price">${formatPrice(product.salePriceU)}</p>
                </span>
            </a>`;
            favoritesContainer.insertAdjacentHTML('beforeend', productHTML);
        });
    }
}

export const favoritesComp = new Favorites(html);