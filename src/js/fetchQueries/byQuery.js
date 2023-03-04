import { ApiService } from '../API/fetchAPI';
import { refs } from '../refs';
import { renderMarkup, clear} from '../renderMarkup';
import { formatDate } from './byPopular';
import * as weather from '../weather';
import * as key from '../const';
import * as storage from '../storageLogic';
import { addToFavorite, onloadFavorite } from '../addToFavorites/addToFavorites';
import { onloadToRead } from '../addToRead/addToRead';
import { clearCurrent } from '../navLogic/navLogic';
import { selectedDate } from '../calendar';
import { removeEventListeners } from './removeListeners';
import { showLoader,hideLoader } from '../loader/loader';
import { paginationByQuery } from '../pagination/paginationByQuery';


refs.filter.addEventListener(`submit`, (e) => {
  e.preventDefault();
  ApiService.lastAction.action = filterQuery;
  ApiService.resetPage();
  //remove listeners
  filterQuery(e);
  removeEventListeners();
});

async function filterQuery(e) {
  
  showLoader();
  let query = null;
  ApiService.lastAction.searchBy = "query";
  if(!!e?.currentTarget?.elements?.query?.value && ApiService.lastAction.query !== e.target.elements.query.value){
    // mean new query
    ApiService.lastAction.e = e;
    query = e.currentTarget.elements.query.value;
    ApiService.lastAction.query = query;
  }
  else if(ApiService.lastAction.query === e.target.elements.query.value){
    // old query(for pagination)
    query = ApiService.lastAction.query;
  }
  
  calendarCheck();

  ApiService.query = query;
  
  const { docs, meta } = await ApiService.getNewsByQuery();
  // NOT FOUND PAGE
  if (docs.length === 0) {
    if (refs.notFoundEl.classList.contains('hidden')) {
      refs.notFoundEl.classList.remove('hidden');
      refs.pageContainer.classList.remove("show")
    }
    clear(refs.gallery);
    hideLoader();
  } else {
    if (!refs.notFoundEl.classList.contains('hidden')) {
      refs.notFoundEl.classList.add('hidden');
    }

    let collectionByQuery = [];
    collectionByQuery = docs.map(result => {
      const {
        abstract,
        pub_date,
        uri,
        web_url,
        multimedia,
        section_name,
        headline,
      } = result;

      let imgUrl;
      if (multimedia.length !== 0) {
        imgUrl = 'https://www.nytimes.com/' + multimedia[2]['url'];
      } else {
        imgUrl = 'https://media4.giphy.com/media/h52OM8Rr5fLiZRqUBD/giphy.gif';
      }

      const newDateFormat = formatDate(pub_date);
      let obj = {
        imgUrl,
        title: headline.main,
        text: abstract,
        date: newDateFormat,
        url: web_url,
        categorie: section_name,
        id: uri,
      };
      return obj;
    });
    
    storage.saveToLocal(key.KEY_COLLECTION, collectionByQuery.slice(0, 9));
    if(ApiService.page === 1) paginationByQuery(meta.hits);
    queryOnPageLoadGallery();
    
}
}

function queryOnPageLoadGallery() {
  let collection = storage.loadFromLocal(key.KEY_COLLECTION);
  let collectionByQuery;
  if (window.matchMedia('(max-width: 768px)').matches) {
    collection = collection.slice(0, 3);
  } else if (window.matchMedia('(max-width: 1280px)').matches) {
    collection = collection.slice(0, 7);
  } else {
    collection = collection.slice(0, 8);
  }
  
  collectionByQuery = collection.map(renderMarkup).join(``);
  clear(refs.gallery);
  clear(refs.accordion);
  refs.notFoundEl.classList.add('hidden');
  renderGallery(collectionByQuery);
  clearCurrent(refs.nav.children,"current-list__item");
  clearCurrent(refs.navMobile.children,"menu-current__item");
  refs.HomeBtn.parentNode.classList.add('current-list__item');
  refs.homeBtnMob.classList.add("menu-current__item");
  onloadToRead();
  onloadFavorite();
  setTimeout(()=> {
    refs.pageContainer.classList.add("show");
  },500) 
  
}

async function renderGallery(markup) {
  let weatherMarkup = await weather.renderDefaultWeather();
  refs.categoriesContainer.classList.remove('hidden-categories'); // in case use filter from read/fav
  refs.gallery.insertAdjacentHTML(`beforeend`,weatherMarkup + markup);
  refs.gallery.addEventListener('click', addToFavorite);
  hideLoader();
}

//=================
// IF CALENDAR INPUT WAS ENTERED
//==================
function calendarCheck(){
  if (!selectedDate) {
    return;
  } else {
    ApiService.beginDate = selectedDate;
    // ApiService.endDate = selectedDate;
  }
}