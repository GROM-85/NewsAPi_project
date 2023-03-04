import { ApiService} from '../API/fetchAPI';
import { refs } from '../refs';
import { renderMarkup, clear} from '../renderMarkup';
import * as storage from '../storageLogic';
import * as key from '../const';
import { onloadToRead } from '../addToRead/addToRead';
import { onloadFavorite } from '../addToFavorites/addToFavorites';
import { paginationByCategory } from '../pagination/paginationByCategories';
import { removeEventListeners } from './removeListeners';
import { showLoader,hideLoader } from '../loader/loader';
export let arrCategories;

window.addEventListener("load",async() => {
  let results = await ApiService.getCategories();
  storage.saveToLocal(key.CATEGOREIS, results);
  arrCategories = storage.loadFromLocal(key.CATEGOREIS);
  categoriesOnPageLoad();
  
})

refs.menu.addEventListener('click', showCategoriesList);

function categoriesOnPageLoad() {
  clearCategories();
  if (window.matchMedia('(min-width: 1279.98px)').matches) {
    markupDesktop();
  } else if (window.matchMedia('(min-width: 767.98px)').matches) {
    markupTablet();
  } else {
    markupMobile();
  }
  refs.categoriesBtnMenu.classList.remove("invisible");
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
      ({section,display_name}) =>
        `<li> <button class="categories__btn" data-value="${section}">${display_name}
    </button> </li>`
    )
    .join(' ');
}

function markupCategoriesInList(arrCategories, begin, end) {
  return arrCategories
    .slice(begin, end)
    .map(
      ({section,display_name}) =>
        `<li class="categories__item" data-value="${section}">${display_name}</li>`
    )
    .join(' ');
}

function showCategoriesList() {
  // refs.categoriesIconUp.classList.toggle('invisible');
  refs.categoriesIconDown.classList.toggle('up');
  refs.categoriesMenu.classList.toggle('invisible');
}

// ====================
// query by CATEGORIES btn click
//=====================
refs.categoriesBox.addEventListener(`click`, (e) => {
  removeEventListeners();
  onCategoriesBtnClick(e);
  ApiService.lastAction.action = onCategoriesBtnClick;
});

// ====================
// query by CATEGORIES
//=====================
async function onCategoriesBtnClick(e) {
  
  ApiService.lastAction.searchBy = "category";
  
  if (!!e?.target?.dataset?.value && ApiService.lastAction.query !== e.target.dataset.value) {
    
    ApiService.resetOffset();
    ApiService.category = e.target.dataset.value;
    ApiService.lastAction.e = e;
    ApiService.lastAction.query = e.target.dataset.value;
  }
  
  if(e.target.dataset.value !== undefined) { // check for Others onCLick
    showLoader();
  }
  else{
    return;
  }
  
  const {results,num_results} = await ApiService.getNewsByCategories();
  let collectionByCategorie = [];
  
  collectionByCategorie = results.map(result => {
    const { abstract, published_date, uri, url, multimedia, section, title } = result;
    let imgUrl;
    if (multimedia) {
      imgUrl = multimedia[2]['url'];
    } else {
      imgUrl = imgUrl =
        'https://media4.giphy.com/media/h52OM8Rr5fLiZRqUBD/giphy.gif';
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
  refs.notFoundEl.classList.add('hidden');

  storage.saveToLocal(key.KEY_COLLECTION, collectionByCategorie.slice(0, 9));
  
  if(ApiService.offset === 0) paginationByCategory(num_results);
  categoriesOnPageLoadGallery();
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
  // weather.renderDefaultWeather();
}

function renderGallery(markup) {

  refs.gallery.insertAdjacentHTML(`beforeend`,markup);
  onloadToRead();
  onloadFavorite();
  hideLoader();
  setTimeout(()=> {
    refs.pageContainer.classList.add("show");
  },500) 
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
