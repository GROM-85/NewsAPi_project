export class NewsAPI{

    #BASE_URL = "https://api.nytimes.com/svc/";
    #API_KEY = "Y0rMFldQHIhCKPc5jiggZphSD4GPFMzb";
    #period;
    #query;
    #beginDate;
    #page;
    #offset;

    #params = {
        "api-key":this.#API_KEY,
        q: this.#query, 
        page: this.#page,
        begin_date: this.#beginDate,
    }

    constructor(){
        this.#period = 7;
        this.category = "all";
        this.#page = 1;
        this.#beginDate = "20120101";
        this.#offset = 0;
    }

    async getPopularNews(){
        const response = await fetch(this.#BASE_URL + `mostpopular/v2/viewed/${this.#period}.json?api-key=${this.#API_KEY}`);
        if(!response.ok){
            throw new Error(error); 
        }
        const {results} =  await response.json();
        return results;
    }

    async getNewsByQuery(){
        Object.assign(this.#params,{
            q:this.#query,
            page:this.#page,
            begin_date: this.#beginDate,
        });

        const response = await fetch(this.#BASE_URL + "search/v2/articlesearch.json?" + new URLSearchParams(this.#params));
        if(!response.ok){
            throw new Error(error); 
        }
        
        const{response:{docs,meta}} = await response.json();
        // console.log(meta) // {hits: 29412, offset: 10, time: 30}
        this.updatePage();
        return {docs,meta};
    }

    async getNewsByCategories(){
        
        const response = await fetch(this.#BASE_URL + `/news/v3/content/inyt/${this.category}.json?` + new URLSearchParams({
            "api-key": this.#API_KEY,
            offset: this.#offset, // divisible by 20
        }));
        if(!response.ok){
            throw new Error(error); 
        }
        this.updateOffset();
        const {results,num_results} = await response.json();
        return {results,num_results};
    }

    async getCategories(){
        const response = await fetch(this.#BASE_URL + `news/v3/content/section-list.json?api-key=${this.#API_KEY}`)
        if(!response.ok){
            throw new Error(error); 
        }
        const {results} =  await response.json();
        return results;
    }

    async getNewsById(array){
        const promises = array.map(id => {
            return fetch(this.#BASE_URL)
        })
    }

    get query(){
        return this.#query;
    }
    set query(newQuery){
        this.#query = newQuery;
    }

    updatePage(){
        this.#page++;
    }
    resetPage(){
        this.#page = 1;
    }

    get date(){
        this.#beginDate;
    }
    set date(newDate){
        this.#beginDate = newDate;
    }

    updateOffset(){
        this.#offset += 20;
    }
    resetOffset(){
        this.#offset = 0;
    }
}