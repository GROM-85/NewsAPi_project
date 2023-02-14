import { NewsAPI } from './API/fetchAPI';
import { refs } from './refs';
import { renderMarkup, clear, renderWeather } from './renderMarkup';
import * as storage from './storageLogic';
import * as key from './const';
import * as weather from './weather';

const newsFetch = new NewsAPI();

const arrCategories = JSON.parse(localStorage.getItem('results'));

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
    .map(
      result =>
        `<li class="categories__item" data-value="${result.section}">${result.display_name}</li>`
    )
    .join(' ');
}

function showCategoriesList() {
  refs.categoriesIconUp.classList.toggle('invisible');
  refs.categoriesIconDown.classList.toggle('invisible');
  refs.categoriesMenu.classList.toggle('invisible');
}

//*****filter categories Btn*****************/
refs.categoriesBox.addEventListener(`click`, onCategoriesBtnClick);

async function onCategoriesBtnClick(e) {
  e.preventDefault();
  if (!e.target.dataset.value) {
    return;
  }
  newsFetch.resetOffset();

  newsFetch.category = e.target.dataset.value;
  const docs = await newsFetch.getNewsByCategories();
  if (docs.length === 0) {
    if (refs.notFoundEl.classList.contains('hidden')) {
      refs.notFoundEl.classList.remove('hidden');
    }
    clear(refs.gallery);
  } else {
    if (!refs.notFoundEl.classList.contains('hidden')) {
      refs.notFoundEl.classList.add('hidden');
    }

    let collectionByCategorie = [];
    collectionByCategorie = docs.results.map(result => {
      const { abstract, published_date, uri, url, multimedia, section, title } =
        result;

      if (multimedia) {
        imgUrl = multimedia[2]['url'];
      } else {
        imgUrl = 'https://media4.giphy.com/media/h52OM8Rr5fLiZRqUBD/giphy.gif';
      }
      const newDateFormat = corectDateInCategories(published_date);

      let obj = {
        imgUrl,
        title,
        text: abstract,
        date: newDateFormat,
        url,
        categorie: section,
        id: uri,
      };
      return obj;
    });

    clear(refs.gallery);

    storage.saveToLocal(key.KEY_COLLECTION, collectionByCategorie.slice(0, 9));

    categoriesOnPageLoadGallery();
  }
}
function categoriesOnResizeGallery() {
  window.addEventListener('resize', e => {
    let collection = storage.loadFromLocal(key.KEY_COLLECTION);
    if (e.currentTarget.innerWidth <= 768) {
      collection = collection.slice(0, 3);
    } else if (e.currentTarget.innerWidth <= 1280) {
      collection = collection.slice(0, 7);
    } else {
      collection = collection.slice(0, 8);
    }
    clear(refs.gallery);
    collectionByPopular = collection.map(renderMarkup).join(``);
    renderGallery(collectionByPopular);
    weather.renderDefaultWeather();
  });
}
function categoriesOnPageLoadGallery() {
  let collection = storage.loadFromLocal(key.KEY_COLLECTION);
  let collectionByPopular;
  if (window.matchMedia('(max-width: 768px)').matches) {
    collection = collection.slice(0, 3);
  } else if (window.matchMedia('(max-width: 1280px)').matches) {
    collection = collection.slice(0, 7);
  } else {
    collection = collection.slice(0, 8);
  }
  collectionByPopular = collection.map(renderMarkup).join(``);
  renderGallery(collectionByPopular);
  weather.renderDefaultWeather();
}

function renderGallery(markup) {
  refs.gallery.insertAdjacentHTML(`beforeend`, markup);
}

function corectDateInCategories(date) {
  let newDateFormat = date.split('-');

  if (newDateFormat.length > 3) {
    newDateFormat[2] = newDateFormat[2].slice(0, 2);
    newDateFormat = newDateFormat.slice(0, 3);

    newDateFormat = newDateFormat.join('/');
  }
  return newDateFormat;
}
