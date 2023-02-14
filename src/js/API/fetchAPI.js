import format from 'date-fns/format';
import { selectedDate } from '../calendar';
class NewsAPI {
  #BASE_URL = 'https://api.nytimes.com/svc/';
  #API_KEY = 'Y0rMFldQHIhCKPc5jiggZphSD4GPFMzb';
  #period;
  #query;
  #beginDate;
  #end_date;

  #params = {
    'api-key': this.#API_KEY,
    q: this.#query
    // begin_date: this.#beginDate,
    // end_date:this.#end_date,
  };

  pageLimit = 8;
  totalCount = 0;
  currentPage = 1;

  constructor() {
    this.#period = 7;
    this.category = 'all';
    // this.#beginDate = format(Date.now(), 'yyyyMMdd');
    // this.#end_date=format(Date.now(), 'yyyyMMdd');
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
    let newDate = null;
    //перевіряє чи календар вибраний
    let params = { ... this.#params, ... { page: (this.currentPage - 1) } };
    if (!selectedDate) {
      newDate = format(Date.now(), 'yyyyMMdd');
    } else {
      newDate = selectedDate;
      params = {
        'api-key': this.#API_KEY,
        q: this.#query,
        begin_date: this.#beginDate,
        end_date: this.#end_date,
      };
      Object.assign(this.#params, {
        q: this.#query,
        begin_date: newDate,
        end_date: newDate,
      });
    }

    const response = await fetch(
      `${this.#BASE_URL}search/v2/articlesearch.json?` +
      new URLSearchParams(params)
    );

    if (!response.ok) {
      throw new Error(error);
    }

    const {
      response: { docs, meta },
    } = await response.json();

    if (meta.hits > 1000) {
      this.totalCount = 1000;
    }
    else {
      this.totalCount = meta.hits;
    }
    // console.log(meta) // {hits: 29412, offset: 10, time: 30}
    return { docs, meta };
  }

  async getNewsByCategories() {
    const response = await fetch(
      `${this.#BASE_URL}news/v3/content/nyt/${this.category}.json?` +
      new URLSearchParams({
        'api-key': this.#API_KEY,
        offset: this.getOffset(), // divisible by 20
        limit: this.pageLimit,
      })
    );
    if (!response.ok) {
      throw new Error(error);
    }
    const { results, num_results } = await response.json();

    if (num_results > 1000) {
      this.totalCount = 1000;
    }
    else {
      this.totalCount = num_results;
    }

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

  get date() {
    this.#beginDate;
  }
  set date(newDate) {
    this.#beginDate = newDate;
  }
  get endDate() {
    this.#end_date;
  }
  set endDate(newDate) {
    this.#end_date = newDate;
  }

  isTheLastPage() {
    return Math.round(this.pageLimit * (this.currentPage - 1)) >= this.totalCount;
  }

  lastPage() {
    return Math.round(this.totalCount / this.pageLimit);
  }

  getOffset() {
    return (this.currentPage - 1) * this.pageLimit;
  }

  lastAction = {
    action: async () => null,
    arg: null,
  };

  cleanPagination() {
    this.currentPage = 1;
    this.totalCount = 0;
  }
}

export const ApiService = new NewsAPI();