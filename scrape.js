const params = {
  locationId: 1700185, 
  categoryId: 27, 
  sortByName: "priceAsc", 
};

let adArray = [];
// Scrape using returned promise
kijiji
  .search(params, options)
  .then((ads) => {
    for (let i = 0; i < ads.length; ++i) {
      console.log(ads[i].title);
    }
  })
  .catch(console.error);