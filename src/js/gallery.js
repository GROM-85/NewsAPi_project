import { NewsAPI } from './API/fetchAPI';
import getRefs from './refs';
import { renderMarkup, clear } from './renderMarkup';

const newsFetch = new NewsAPI();
const refs = getRefs();



newsFetch.query = 'apple';


//listener update main page with popular news//
window.addEventListener('load', fetchByPopular);

async function fetchByPopular() {     
    const  docs  = await newsFetch.getPopularNews();
    console.log(docs)
    let collectionByPopular = docs.map(result => {

        const { uri, nytdsection, title, abstract, published_date, url,media } = result;
        if (result.media[0] !== undefined) {
            console.log("result.media")
            imgUrl = result.media[0]["media-metadata"][2]["url"];
        }else{
            imgUrl = "https://www.shutterstock.com/image-photo/canadian-national-flag-overlay-false-260nw-1720481365.jpg"
        }
                
        let newDateFormat = published_date.split("-");
        newDateFormat = newDateFormat.join("/")        
        let obj = {
            imgUrl,
            title,
            text: abstract,
            date: newDateFormat,
            url,
           categorie:nytdsection,
           id:uri,
        };
        return renderMarkup(obj);
    }).join('');
  renderGallery(collectionByPopular);
}
 
function renderGallery(markup) { 
   refs.gallery.insertAdjacentHTML(`beforeend`, markup);
 }


