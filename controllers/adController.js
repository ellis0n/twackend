const kijiji = require("kijiji-scraper");
const fs = require("fs");
const path = require("path");
// Core scraper functionality
const scrape = async (parameters) => {
  let adArray = [];

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

const save = async (ad) => {
  const saveFile = path.join(__dirname, "..", "model", "ads.json");
  fs.readFile(saveFile, "utf-8", (error, data) => {
    if (error) throw error;
    let userAds = JSON.parse(data);
    userAds.push(ad);

    fs.writeFile(saveFile, JSON.stringify(userAds), (error) => {
      if (error) throw error;
    });
  });
};

const scrapeAds = async (req, res) => {
  console.log(req.body);
  const ads = await scrape(req.body);
  const jsonAds = JSON.stringify(ads);
  return res.status(200).json(jsonAds);
};

const saveAd = async (req, res) => {
  console.log(req.body);
  const savedAd = await save(req.body).then(console.log("Ad saved."));
  console.log;
  return res.status(200);
};

const getAds = async (req, res) => {
  console.log(req.body);
  const saveFile = path.join(__dirname, "..", "model", "ads.json");
  fs.readFile(saveFile, "utf-8", (error, data) => {
    if (error) throw error;
    let ads = JSON.parse(data);
    res.status(200).json(ads);
  });
};

module.exports = {
  scrapeAds,
  saveAd,
  getAds,
};
