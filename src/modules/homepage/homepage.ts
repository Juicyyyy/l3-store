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

  private showSuggestions_2(){
    const popularProducts: string[] = ['чехол iphone 13 pro', 'коляски agex', 'яндекс станция 2', 'товар4', 'товар5', 'товар6']; // Моковые данные
    const suggestionContainer = this.view.suggestions;
  
    // Очистка контейнера подсказок
    if (suggestionContainer) {
      suggestionContainer.innerHTML = "";
    }
  
    // Выбираем случайные подсказки из списка товаров
    const suggestions: string[] = this.getRandomSuggestions(popularProducts, 3);
      
    // Генерация HTML-кода подсказок
    let suggestionHtml: string = '<span class="homepage__text">Например, ';
    
    suggestions.forEach((suggestion: string, index: number) => {
      if (index === suggestions.length - 1) {
        suggestionHtml += `или <div class="homepage__wrapperSpan"><span class="homepage__span">${suggestion}</span></div>`;
      } else {
        suggestionHtml += `<div class="homepage__wrapperSpan"><span class="homepage__span">${suggestion}</span></div>, `;
      }
    });
    suggestionHtml += '</span>';

    // Добавление подсказок в контейнер
    suggestionContainer.innerHTML = suggestionHtml;
  }
  
  private getRandomSuggestions(products: string[], count: number): string[] {
    // Копируем исходный массив, чтобы не мутировать его
    const productsCopy: string[] = [...products];
  
    // Перемешиваем массив
    for (let i = productsCopy.length - 1; i > 0; i--) {
      const j: number = Math.floor(Math.random() * i);
      const temp: string = productsCopy[i];
      productsCopy[i] = productsCopy[j];
      productsCopy[j] = temp;
    }
  
    // Берем первые n элементов
    return productsCopy.slice(0, count);
  }
}

export const homepageComp = new Homepage(html);
