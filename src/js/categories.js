import { NewsAPI } from './API/fetchAPI';
import * as storage from './storageLogic';

const newsFetch = new NewsAPI();

// get categories 50 results
newsFetch.getCategories().then(console.log);

const arrCategories = JSON.parse(localStorage.getItem('results'));
const refs = {
  categoriesBtnMenu: document.querySelector('.categories__btn-menu'),
  categoriesBox: document.querySelector('.categories'),
  categoriesList: document.querySelector('.categories__list'),
  categoriesMenu: document.querySelector('.categories__menu'),
  menu: document.querySelector('.menu'),
  categoriesIconUp: document.querySelector('.categories__icon-up'),
  categoriesIconDown: document.querySelector('.categories__icon-down'),
  categoriesBtnList: document.querySelector('.categories__btn-list'),
  categoriesBtnMenuText: document.querySelector('.categories__btn-text'),
};

saveCategories();
categoriesOnResize();
categoriesOnPageLoad();
refs.categoriesBtnMenu.addEventListener('mouseenter', showCategoriesList);
refs.menu.addEventListener('mouseleave', showCategoriesList);

function saveCategories() {
  newsFetch.getCategories().then(results => {
    localStorage.setItem('results', JSON.stringify(results));
  });
}

function categoriesOnResize() {
  window.addEventListener('resize', e => {
    if (e.currentTarget.innerWidth >= 1279.98) {
      clearCategories();
      markupDesktop();
    } else if (e.currentTarget.innerWidth >= 767.98) {
      clearCategories();
      markupTablet();
    } else {
      clearCategories();
      markupMobile();
    }
  });
}

function categoriesOnPageLoad() {
  if (window.matchMedia('(min-width: 1279.98px)').matches) {
    clearCategories();
    markupDesktop();
  } else if (window.matchMedia('(min-width: 767.98px)').matches) {
    clearCategories();
    markupTablet();
  } else {
    clearCategories();
    markupMobile();
  }
}

function clearCategories() {
  refs.categoriesBtnList.innerHTML = '';
  refs.categoriesList.innerHTML = '';
}

function markupTablet() {
  refs.categoriesBtnList.insertAdjacentHTML(
    'afterbegin',
    markupCategoriesInBtn(arrCategories, 0, 4)
  );
  refs.categoriesList.insertAdjacentHTML(
    'afterbegin',
    markupCategoriesInList(arrCategories, 4)
  );
  refs.categoriesBtnMenuText.textContent = 'Others';
}

function markupDesktop() {
  refs.categoriesBtnList.insertAdjacentHTML(
    'afterbegin',
    markupCategoriesInBtn(arrCategories, 0, 6)
  );
  refs.categoriesList.insertAdjacentHTML(
    'afterbegin',
    markupCategoriesInList(arrCategories, 6)
  );
  refs.categoriesBtnMenuText.textContent = 'Others';
}

function markupMobile() {
  refs.categoriesList.insertAdjacentHTML(
    'afterbegin',
    markupCategoriesInList(arrCategories)
  );
  refs.categoriesBtnMenuText.textContent = 'Categories';
}

function markupCategoriesInBtn(arrCategories, begin, end) {
  return arrCategories
    .slice(begin, end)
    .map(
      result =>
        `<li> <button class="categories__btn" data-value="${result.section}">${result.display_name}
    </button> </li>`
    )
    .join(' ');
}

function markupCategoriesInList(arrCategories, begin, end) {
  return arrCategories
    .slice(begin, end)
    .map(result => `<li class="categories__item" data-value="${result.section}">${result.display_name}</li>`)
    .join(' ');
}

function showCategoriesList() {
  refs.categoriesIconUp.classList.toggle('invisible');
  refs.categoriesIconDown.classList.toggle('invisible');
  refs.categoriesMenu.classList.toggle('invisible');
}
