export class NewsAPI{

    #BASE_URL = "https://api.nytimes.com/svc/";
    #API_KEY = "Y0rMFldQHIhCKPc5jiggZphSD4GPFMzb";
    #period;
    #query;
    #beginDate;
    #page;

    #params = {
        "api-key":this.#API_KEY,
        q:this.#query, 
    }

    constructor(){
        this.#period = 7;
        this.category = "all";
    }

    async getPopularNews(){
        const response = await fetch(this.#BASE_URL + `mostpopular/v2/viewed/${period}.json`);
        if(!response.ok){
            throw new Error(error); 
        }
        return await response.json();

    }

    async getNewsByQuery(){
        Object.assign(this.#params,{q:this.#query});

        const response = await fetch(this.#BASE_URL + "search/v2/articlesearch.json" + new URLSearchParams(this.#params));
        if(!response.ok){
            throw new Error(error); 
        }
        return await response.json();
    }

    async getNewsByCategories(){
        let page = this.updatePage();
        const response = await fetch(this.#BASE_URL + `/news/v3/content/inyt/${this.category}.json?` + new URLSearchParams({
            "api-key": this.#API_KEY,
            offset: page,
        }));
        if(!response.ok){
            throw new Error(error); 
        }
        return await response.json();
    }

    async getCategories(){
        const response = await fetch(this.#BASE_URL + `news/v3/content/section-list.json?api-key=${this.#BASE_URL}`)
        if(!response.ok){
            throw new Error(error); 
        }
        return await response.json();
    }

    async getDataById(array){
        const promises = array.map(id =>{
            return fetch(this.#BASE_URL)
        })
    }

    get query(){
        return this.#query;
    }
    set query(newQuery){
        this.#query = newQuery;
    }
}