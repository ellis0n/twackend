const kijiji = require("kijiji-scraper")
const fs = require("fs")

let adArray = [];

// TODO: user paramter input
const params = {
  locationId: 9008,
  categoryId: 17, 
  sortByName: "dateDesc", 
};

kijiji
  .search(params)
  .then((ads) => {
    for (let i = 10; i > 0; i--) {
      let newAd = []
      let ad = ads[i]; // TODO: destructure?
      newAd = {id: ad.id, img: ad.image, title: ad.title, price: ad.attributes.price, url: ad.url, desc: ad.description}
      adArray.push(newAd)
    }
    const jsonString = JSON.stringify(adArray)
    fs.writeFile('./model/ads.json', jsonString, err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file')
        }
    // return adArray;
  })
})
return adArray;

