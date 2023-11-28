import { addElement } from '../../utils/helpers';
import { Component } from '../component';
import html from './homepage.tpl.html';
import { ProductData } from 'types';
import { ProductList } from '../productList/productList';

class Homepage extends Component {
  popularProducts: ProductList;
  products: ProductData[];

  constructor(props: any) {
    super(props);
    this.products = [];
    this.popularProducts = new ProductList();
    this.popularProducts.attach(this.view.popular);
    this.view.search.addEventListener('input', this.showSuggestions.bind(this));
    this.showSuggestions_2();
  }

  render() {
    fetch('/api/getPopularProducts')
      .then((res) => res.json())
      .then((products) => {
        this.popularProducts.update(products);
      });

    const isSuccessOrder = new URLSearchParams(window.location.search).get('isSuccessOrder');
    if (isSuccessOrder != null) {
      const $notify = addElement(this.view.notifies, 'div', { className: 'notify' });
      addElement($notify, 'p', {
        innerText:
          'Заказ оформлен. Деньги спишутся с вашей карты, менеджер может позвонить, чтобы уточнить детали доставки'
      });
    }
  }

  private showSuggestions() {
    const inputSearch = this.view.search;
    const suggestions = this.popularProducts.productName;
    const suggestionContainer = this.view.tips;

    suggestionContainer.innerHTML = "";

    const inputValue = inputSearch.value.toLowerCase();
    
    const matchingSuggestions = suggestions.filter(suggestion =>
      suggestion.toLowerCase().startsWith(inputValue)
    );
  
    for (let i = 0; i < matchingSuggestions.length; i++) {
      if (matchingSuggestions.length >= 3) {
        suggestionContainer.innerHTML = `
        <span class="homepage__text">Например, 
          <div class="homepage__wrapperSpan">
            <span class="homepage__span">${matchingSuggestions[0]}</span>
          </div>, 
          <div class="homepage__wrapperSpan">
            <span class="homepage__span">${matchingSuggestions[1]}</span>
          </div>
          или 
          <div class="homepage__wrapperSpan">
            <span class="homepage__span">${matchingSuggestions[2]}</span>
          </div>
        </span>`
      } else if (matchingSuggestions.length === 2) {
        suggestionContainer.innerHTML = `
        <span class="homepage__text">Например, 
          <div class="homepage__wrapperSpan">
            <span class="homepage__span">${matchingSuggestions[0]}</span>
          </div>, 
          <div class="homepage__wrapperSpan">
            <span class="homepage__span">${matchingSuggestions[1]}</span>
          </div>
        </span>`
      } else {
        suggestionContainer.innerHTML = `
        <span class="homepage__text">Например, 
          <div class="homepage__wrapperSpan">
            <span class="homepage__span">${matchingSuggestions[0]}</span>
          </div>
        </span>`
      }
    }
  }

  private showSuggestions_2(){
    const suggestions = [{title: 'чехол iphone 13 pro', href: '#'}, {title: 'коляски agex', href: '#'}, {title: 'яндекс станция 2git', href: '#'}];

    const suggestionContainer = this.view.suggestions;
    let html = '<span class="homepage__text">Например, ';

    suggestions.forEach((suggestion, index) => {
      if (index > 2) return;

      html += `
        <div class="homepage__wrapperSpan">
          <a class="homepage__span" href="${suggestion.href}">${suggestion.title}</a>
        </div>`;
      
      if((index === 0) && (suggestions.length !== 1)) {
        html += ', ';
      }
      else if((index === 1) && (suggestions.length !== 2)) {
        html += ' или '
      }
    })

    html += '</span>';
    suggestionContainer.innerHTML = html;
  }
}

export const homepageComp = new Homepage(html);
