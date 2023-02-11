import { NewsAPI } from './js/API/fetchAPI';

const newsFetch = new NewsAPI();

// get categories 50 results
newsFetch.getCategories().then(console.log);

// // get popular 20 results
// newsFetch.getPopularNews().then(console.log);

// // get news by query/date 10 results
// newsFetch.query = 'apple';
// newsFetch.getNewsByQuery().then(console.log);

// // get by category name
// newsFetch.getNewsByCategories().then(console.log);

// newsFetch.getCategories().then(console.log);

const arrCategories = JSON.parse(localStorage.getItem('results'));
const refs = {
  categoriesBtnMenu: document.querySelector('.categories__btn-menu'),
  categoriesBox: document.querySelector('.categories'),
  categoriesList: document.querySelector('.categories__list'),
  categoriesMenu: document.querySelector('.categories__menu'),
  categoriesIconUp: document.querySelector('.categories__icon-up'),
  categoriesIconDown: document.querySelector('.categories__icon-down'),
  categoriesBtnList: document.querySelector('.categories__btn-list'),
};

saveCategories();
categoriesOnResize();
categoriesOnPageLoad();
refs.categoriesBtnMenu.addEventListener('click', showCategoriesList);

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
}

function markupMobile() {
  refs.categoriesList.insertAdjacentHTML(
    'afterbegin',
    markupCategoriesInList(arrCategories)
  );
  refs.categoriesBtnMenu.textContent = 'Categories';
  // refs.categoriesBtnMenu.insertAdjacentHTML(
  //   'beforeend',
  //   '<svg class="categories__icon-up invisible" width="14" height="14"><use href="./images/icons.svg#arrowDown"></use></svg>'
  // );
}

function markupCategoriesInBtn(arrCategories, begin, end) {
  return arrCategories
    .slice(begin, end)
    .map(
      result =>
        `<li> <button class="categories__btn">${result.display_name}
    </button> </li>`
    )
    .join(' ');
}

function markupCategoriesInList(arrCategories, begin, end) {
  return arrCategories
    .slice(begin, end)
    .map(result => `<li class="categories__item">${result.display_name}</li>`)
    .join(' ');
}

function showCategoriesList() {
  refs.categoriesIconUp.classList.toggle("invisible");
  refs.categoriesIconDown.classList.toggle("invisible");
  refs.categoriesMenu.classList.toggle("invisible");
}
