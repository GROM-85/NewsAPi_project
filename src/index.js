
import './js/gallery';





// get popular 20 results
newsFetch.getPopularNews().then(console.log)

// get news by query/date 10 results
newsFetch.query = "apple"
newsFetch.getNewsByQuery().then(console.log)

// get by category name
newsFetch.getNewsByCategories().then(console.log)



