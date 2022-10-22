const kijiji = require("kijiji-scraper");
const fs = require("fs");

// let adArray = [];

const scrape = async() => {
  console.log("Scraping...")
  let adArray = [];

  // TODO: Allow user to define parameters
  const params = {
    locationId: 9008,
    categoryId: 17,
    sortByName: "dateDesc",
  };

  kijiji.search(params).then((ads) => {
    for (let i = 0; i < 20; i++) {
      console.log(ads.length)
      let ad = ads[i]; // TODO: simplify
      newAdObj = {
        id: ad.id,
        img: ad.image,
        title: ad.title.toUpperCase(),
        price: ad.attributes.price,
        url: ad.url,
        desc: ad.description,
        status: ad.isScraped,
      };
      console.log(adArray)
      adArray.push(newAdObj);
      console.log(adArray)
    }
    const jsonString = JSON.stringify(adArray);
    fs.writeFile("../model/ads.json", jsonString, (err) => {
      if (err) {
        console.log("Error writing file", err);
      } else {
        console.log("Successfully wrote file");
      }
      console.log(adArray)
      return adArray;
    });
  });
};
module.exports = { scrape };
