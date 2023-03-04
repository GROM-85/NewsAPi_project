import * as storage from '../storageLogic';
import { refs } from '../refs';
import * as key from '../const';
import * as page from './pagination';
import * as render from "../renderMarkup";
import { renderGallery } from '../fetchQueries/byPopular';
import { onloadToRead } from '../addToRead/addToRead';
import { onloadFavorite } from '../addToFavorites/addToFavorites';
import { ApiService } from '../API/fetchAPI';

const pageLimit = 8;

const valuePage = {
  curPage: 1,
  numLinksTwoSide: 1,
  totalPages: null,
};

export function paginationByPopular(collection){
  valuePage.totalPages = Math.ceil(collection/pageLimit);
  valuePage.curPage = 1;
  console.log(ApiService.lastAction.searchBy)
  if(ApiService.lastAction.searchBy !== "popular")return;
  page.pagination(valuePage);
  refs.pageContainer.addEventListener('click',popularPageContainer);

  refs.pg.addEventListener('click', popularPg);  
    
}

export function popularPg(e){
  const elem = e.target;
  if (elem.dataset.page) {
    const pageNumber = parseInt(e.target.dataset.page, 10);
    refs.btnPrevPg.disabled = true;
    valuePage.curPage = pageNumber;
    page.pagination(valuePage);
    
    page.handleButtonLeft(valuePage);
    page.handleButtonRight(valuePage);
    
  }
}

export function  popularPageContainer(e){
  let currPage = page.handleButton(e.target,valuePage);
  let offest = (currPage - 1) * pageLimit;
  let nextPageCollect = storage.loadFromLocal(key.KEY_COLLECTION).slice(offest,offest+pageLimit);
  render.clear(refs.gallery);
  refs.pageContainer.classList.remove("show");
  let markup = nextPageCollect.map(render.renderMarkup).join('');
  renderGallery(markup);
  onloadToRead();
  onloadFavorite();
  refs.pageContainer.classList.add("show");
  
}