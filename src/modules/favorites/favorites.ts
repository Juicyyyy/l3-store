import { Component } from '../component';
import html from './favorites.tpl.html';
import { ProductData } from 'types';
import { formatPrice } from '../../utils/helpers';
import { sendEvent } from '../../utils/helpers';

export class Favorites extends Component {
    products!: ProductData[];

    async init() {
        this.products = await JSON.parse(localStorage.getItem('favorites') || '[]');

        if (this.products.length < 1) {
            const favoritesLink = document.querySelector('.favoritesLink');
            favoritesLink?.classList.add('checkout__empty');
            return;
        }
    }

    async render() {
        const favoritesContainer = document.querySelector('.favorites__wrapper') as HTMLElement;
        this.products = await JSON.parse(localStorage.getItem('favorites') || '[]');

        this.products.forEach((product) => {
            const productCard = document.createElement('div');
            productCard.classList.add('product');

            const productImage = document.createElement('img');
            productImage.classList.add('product__img');
            productImage.src = product.src;
            
            const productName = document.createElement('h3');
            productName.classList.add('product__title');
            productName.textContent = product.name;

            const productPrice = document.createElement('p');
            productPrice.innerText = formatPrice(product.salePriceU);

            productCard.append(productImage, productName, productPrice);
            favoritesContainer.appendChild(productCard as HTMLElement);
        });
        sendEvent('route', { url: window.location.href });
    }
}

export const favoritesComp = new Favorites(html);