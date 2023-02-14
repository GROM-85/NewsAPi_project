import format from 'date-fns/format';
import { selectedDate } from '../calendar';
export class NewsAPI {
  #BASE_URL = 'https://api.nytimes.com/svc/';
  #API_KEY = 'Y0rMFldQHIhCKPc5jiggZphSD4GPFMzb';
  #period;
  #query;
  #beginDate;

  #page;
  #offset;
  #end_date;

  #params = {
    'api-key': this.#API_KEY,
    q: this.#query,
    page: this.#page,
    // begin_date: this.#beginDate,
    // end_date:this.#end_date,
  };

  pageLimit = 8;
  totalCount = 0;
  currentPage = 1;

  constructor() {
    this.#period = 7;
    this.category = 'all';
    this.#page = 1;
    // this.#beginDate = format(Date.now(), 'yyyyMMdd');
    this.#offset = 0;
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
    if (!selectedDate) {
      newDate = format(Date.now(), 'yyyyMMdd');
      Object.assign(this.#params, {
        q: this.#query,
        page: this.#page,
      });
    } else {
      newDate = selectedDate;
      this.#params = {
        'api-key': this.#API_KEY,
        q: this.#query,
        page: this.#page,
        begin_date: this.#beginDate,
        end_date: this.#end_date,
      };
      Object.assign(this.#params, {
        q: this.#query,
        page: this.#page,
        begin_date: newDate,
        end_date: newDate,
      });
    }

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
    this.updatePage();
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
    this.updateOffset();
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

  updatePage() {
    this.#page++;
  }
  resetPage() {
    this.#page = 1;
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

  updateOffset() {
    this.#offset += 20;
  }
  resetOffset() {
    this.#offset = 0;
  }
}
