import { ApiService } from "../API/fetchAPI";
import { refs } from "../refs";
import * as render from "../renderMarkup";
import * as page from './pagination';
import { throttle } from "throttle-debounce";
const pageLimit = 8;
const valuePage = {
  curPage: 1,
  numLinksTwoSide: 1,
  totalPages: null,
};

export function paginationByCategory(collection){
  console.log(ApiService.lastAction.searchBy)
    if(ApiService.lastAction.searchBy !== "category")return;

    if(collection > 1000){
        collection = 1000;
    }
    refs.btnPrevPg.disabled = true;
    valuePage.totalPages = Math.ceil(collection/pageLimit);
    valuePage.curPage = ApiService.offset/20 + 1;
    page.pagination(valuePage);

    refs.pageContainer.addEventListener('click',categoryPageContainer);
    
    refs.pg.addEventListener('click', categoryPg);
      
}

export function categoryPageContainer(e){
  ApiService.offset =  (page.handleButton(e.target,valuePage) - 1) * 20;
  refs.pageContainer.classList.remove("show");
  render.clear(refs.gallery);
  ApiService.lastAction.action(ApiService.lastAction.e);
}

export function categoryPg(e){
        
  const elem = e.target;

  if (elem.dataset.page) {
    const pageNumber = parseInt(e.target.dataset.page, 10);

    valuePage.curPage = pageNumber;
    ApiService.offset = (pageNumber - 1) * 20;
    page.pagination(valuePage);
    page.handleButtonLeft(valuePage);
    page.handleButtonRight(valuePage);
  }
}