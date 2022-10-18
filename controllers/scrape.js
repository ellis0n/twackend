const kijiji = require("kijiji-scraper")
const fs = require("fs")

// locations.ts file for ids 
const params = {
  locationId: 9008,
  categoryId: 17, 
  sortByName: "dateDesc", 
};

let adArray = [];

kijiji
  .search(params)
  .then(async(ads) => {
    for (let i = 1; i > 0; i--) {
      let ad = ads[i];
      adArray.push(ad)
    }
    const jsonString = JSON.stringify(adArray)
    fs.writeFile('../model/ads.json', jsonString, err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file')
        }
    return adArray;
  })
})
  
  console.log(adArray)