const kijiji = require("kijiji-scraper");
const fs = require('fs');
const fsPromises = fs.promises;

// Core scraper functionality
const scrape = async(parameters) => {
  let adArray = [];

  try{
  const params = {
    locationId: JSON.parse(parameters.location),
    categoryId: JSON.parse(parameters.category),
    sortByName: "dateAsc",
  };
  await kijiji.search(params).then((ads) => {
    for (let i = 0; i < 1; i++) {
      let ad = ads[i];
      newAdObj = {
        id: ad.id,
        img: ad.image,
        title: ad.title.toUpperCase(),
        price: ad.attributes.price,
        url: ad.url,
        desc: ad.description,
        status: ad.isScraped,
      };
      adArray.push(newAdObj);

    }
  });
} catch(err){
    throw err
  }
  return adArray
};

const scrapeAds = async(req, res) =>{
  console.log(req.body)
  const ads = await scrape(req.body); 
  const jsonAds = JSON.stringify(ads);
  return res.status(200).json(jsonAds);
};


const saveAds = async(req, res) => {
  console.log(req.body)
  return res.status(200)
}
  // fs.writeFile(__dirname + "/model/ads.json", req.body)};

module.exports = {
  scrapeAds,
  saveAds,
};
