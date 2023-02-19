import { queryPg,queryPageContainer } from '../pagination/paginationByQuery';
import { popularPg,popularPageContainer } from '../pagination/paginationByPopular';
import { categoryPg,categoryPageContainer } from '../pagination/paginationByCategories';
import { refs } from '../refs';

export function removeEventListeners(){
    refs.pageContainer.removeEventListener('click',popularPageContainer);
    refs.pg.removeEventListener('click', popularPg);
    refs.pg.removeEventListener('click', queryPg);
    refs.pageContainer.removeEventListener("click",queryPageContainer)
    refs.pageContainer.removeEventListener('click',categoryPageContainer);
    refs.pg.removeEventListener('click', categoryPg);
}