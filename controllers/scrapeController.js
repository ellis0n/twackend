const kijiji = require("kijiji-scraper");

// Core scraper functionality
const scrape = async (parameters) => {
  let adArray = [];
console.log(parameters)
  try {
    const params = {
      locationId: JSON.parse(parameters.location),
      categoryId: JSON.parse(parameters.category),
      sortByName: "dateAsc",
    };
    await kijiji.search(params).then((ads) => {
      for (let i = 0; i < ads.length; i++) {
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
  } catch (err) {
    throw err;
  }
  return adArray;
};

const scrapeAds = async (req, res) => {
  console.log(req.body);
  const ads = await scrape(req.body);
  const jsonAds = JSON.stringify(ads);
  return res.status(200).json(jsonAds);
};
module.exports = {
  scrapeAds,
};
