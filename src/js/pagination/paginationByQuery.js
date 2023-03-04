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

export function paginationByQuery(collection){
  
    if(ApiService.lastAction.searchBy !== "query")return;

    if(collection > 1000){
        collection = 1000;
    }
    refs.btnPrevPg.disabled = true;
    valuePage.totalPages = Math.ceil(collection/pageLimit);
    valuePage.curPage = ApiService.page;
    page.pagination(valuePage);

    refs.pageContainer.addEventListener('click',queryPageContainer);
    
    refs.pg.addEventListener('click', queryPg);
      
}

export function queryPageContainer(e){
  ApiService.page = page.handleButton(e.target,valuePage);
  refs.pageContainer.classList.remove("show");
  render.clear(refs.gallery);
  ApiService.lastAction.action(ApiService.lastAction.e);
}

export function queryPg(e){
        
  const elem = e.target;

  if (elem.dataset.page) {
    const pageNumber = parseInt(e.target.dataset.page, 10);

    valuePage.curPage = pageNumber;
    ApiService.page = pageNumber;
    page.pagination(valuePage);
    
    page.handleButtonLeft(valuePage);
    page.handleButtonRight(valuePage);
  }
}