const kijiji = require("kijiji-scraper");
const Save = require("../model/Save");

//  Core scraper functionality
//  TODO:: check for user saved ads, dont return ad already voted

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
        };

        if (
          Object.values(newAdObj).every(
            (value) => value !== "" && value !== undefined
          )
        ) {
          adArray.push(newAdObj);
        }
      }
      // console.log("HERE ARE ADS SCRAPED:");
      // console.log(adArray);
    });
  } catch (err) {
    throw err;
  }
  let filteredAds = await filterAds(adArray);
  return filteredAds;
};

const filterAds = async (adArray) => {
  let newAdArray = [];
  for (let i = 0; i < adArray.length; i++) {
    let ad = adArray[i];
    let search = await Save.findOne({ ad: ad }).exec();
    if (!search) {
      newAdArray.push(ad);
    }
  }
  return newAdArray;
};

const scrapeAds = async (req, res) => {
  console.log(req.body);
  const ads = await scrape(req.body);
  const jsonAds = JSON.stringify(ads);
  if (!jsonAds) {
    return res
      .status(200)
      .json({ message: "No more ads to view. Try again later!" });
  }
  return res.status(200).json(jsonAds);
};

module.exports = {
  scrapeAds,
};
