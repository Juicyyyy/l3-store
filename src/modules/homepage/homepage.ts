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
    // Очистка контейнера подсказок
    suggestionContainer.innerHTML = "";

    
    // Получение значения из инпута
     const inputValue = inputSearch.value.toLowerCase();
    
    // Фильтрация подсказок, соответствующих вводу
    const matchingSuggestions = suggestions.filter(suggestion =>
      suggestion.toLowerCase().startsWith(inputValue)
    );
    
    // Добавление подсказок в контейнер
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
}

export const homepageComp = new Homepage(html);
