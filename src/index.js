import { NewsAPI } from './js/API/fetchAPI';

const newsFetch = new NewsAPI();

// get categories 50 results
newsFetch.getCategories().then(console.log);

// get popular 20 results
newsFetch.getPopularNews().then(console.log);

// get news by query/date 10 results
newsFetch.query = 'apple';
newsFetch.getNewsByQuery().then(console.log);

// get by category name
newsFetch.getNewsByCategories().then(console.log);

const refs = {
  categoriesBtnMenu: document.querySelector('.categories__btn-menu'),
  categoriesBox: document.querySelector('.categories'),
  categoriesList: document.querySelector('.categories__list'),
  categoriesMenu: document.querySelector('.categories__menu'),
  categoriesIconUp: document.querySelector('.categories__icon-up'),
  categoriesIconDown: document.querySelector('.categories__icon-down'),
};

fetchCategories();
refs.categoriesBtnMenu.addEventListener('click', showCategoriesList);

function fetchCategories(results) {
  newsFetch.getCategories().then(results => {
    if (window.matchMedia('(min-width: 1279.98px)').matches) {
      refs.categoriesBox.insertAdjacentHTML(
        'afterbegin',
        markupCategoriesInBtn(results, 0, 6)
      );
      refs.categoriesList.insertAdjacentHTML(
        'afterbegin',
        markupCategoriesInList(results, 6)
      );
    } else if (window.matchMedia('(min-width: 767.98px)').matches) {
      refs.categoriesBox.insertAdjacentHTML(
        'afterbegin',
        markupCategoriesInBtn(results, 0, 4)
      );
      refs.categoriesList.insertAdjacentHTML(
        'afterbegin',
        markupCategoriesInList(results, 4)
      );
    } else {
      refs.categoriesList.insertAdjacentHTML(
        'afterbegin',
        markupCategoriesInList(results)
      );
        refs.categoriesBtnMenu.textContent = "Categories"
    }
  });
}

function markupCategoriesInBtn(results, begin, end) {
  return results
    .slice(begin, end)
    .map(
      result =>
        `<button class="categories__btn">${result.display_name}
    </button>`
    )
    .join(' ');
}

function markupCategoriesInList(results, begin, end) {
  return results
    .slice(begin, end)
    .map(result => `<li class="categories__item">${result.display_name}</li>`)
    .join(' ');
}

function showCategoriesList() {
  refs.categoriesIconUp.classList.toggle('invisible');
  refs.categoriesIconDown.classList.toggle('invisible');
  refs.categoriesMenu.classList.toggle('invisible');
}


