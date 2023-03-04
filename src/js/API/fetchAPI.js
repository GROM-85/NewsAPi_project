import format from 'date-fns/format';
import { selectedDate } from '../calendar';
export class NewsAPI {
  #BASE_URL = 'https://api.nytimes.com/svc/';
  #API_KEY = 'Y0rMFldQHIhCKPc5jiggZphSD4GPFMzb';
  #period;
  #query;
  #begin_date;
  #end_date;

  #page;
  #offset;
  

  #params = {
    'api-key': this.#API_KEY,
    q: this.#query,
    page: this.#page,
  };

  constructor() {
    this.#period = 7;
    this.category = 'all';
    this.#page = 1;
    this.#offset = 0;
    this.#begin_date = '';
    this.#end_date = '';
  }

  async getPopularNews() {
    const response = await fetch(
      this.#BASE_URL +
        `mostpopular/v2/viewed/${this.#period}.json?api-key=${this.#API_KEY}`
    );
    if (!response.ok) {
      throw new Error(error);
    }
    const { results } = await response.json();
    return results;
  }

  async getNewsByQuery() {
    this.updateParams();
    
    const response = await fetch(
      this.#BASE_URL +
        'search/v2/articlesearch.json?' +
        new URLSearchParams(this.#params)
    );

    if (!response.ok) {
      throw new Error(error);
    }

    const {
      response: { docs, meta },
    } = await response.json();
    // console.log(meta) // {hits: 29412, offset: 10, time: 30}
    return { docs, meta };
  }

  async getNewsByCategories() {
    const response = await fetch(
      this.#BASE_URL +
        `news/v3/content/nyt/${this.category}.json?` +
        new URLSearchParams({
          'api-key': this.#API_KEY,
          offset: this.#offset, // divisible by 20
        })
    );
    if (!response.ok) {
      throw new Error(error);
    }
    const { results, num_results } = await response.json();
    return { results, num_results };
  }

  async getCategories() {
    const response = await fetch(
      this.#BASE_URL +
        `news/v3/content/section-list.json?api-key=${this.#API_KEY}`
    );
    if (!response.ok) {
      throw new Error(error);
    }
    const { results } = await response.json();
    return results;
  }

  get query() {
    return this.#query;
  }
  set query(newQuery) {
    this.#query = newQuery;
  }

  resetPage() {
    this.#page = 1;
  }
  get page(){
    return this.#page;
  }
  set page(newPage){
    this.#page = newPage;
  }
  get beginDate() {
    this.#begin_date;
  }
  set beginDate(newDate) {
    this.#begin_date = newDate;
  }
  get endDate() {
    this.#end_date;
  }
  set endDate(newDate) {
    this.#end_date = newDate;
  }
  get offset(){
    return this.#offset;
  }
  set offset(newOffset){
    this.#offset = newOffset;
  }

  updateOffset() {
    this.#offset += 20;
  }
  resetOffset() {
    this.#offset = 0;
  }
  updateParams(){
    if(this.#begin_date !== ''){
      Object.assign(this.#params,{
        q:this.#query,
        page:this.#page,
        begin_date: this.#begin_date,
      })
    }else{
      Object.assign(this.#params,{
        q:this.#query,
        page:this.#page,
      })
    }
  }
  lastAction = {
    action: async () => null,
    query: null,
    e:null,
    searchBy: null,
  }
}

export const  ApiService = new NewsAPI();