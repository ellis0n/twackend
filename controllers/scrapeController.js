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

    const options = {
      minResults: 20,
    };

    await kijiji.search(params, options).then((ads) => {
      // console.log(ads.length);

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

        //  find a more efficient way to filter before creating newAdObj
        if (
          Object.values(newAdObj).every(
            (value) => value !== "" && value !== undefined
          )
        ) {
          adArray.push(newAdObj);
        }
        // console.log(adArray.length)
      }
    });
  } catch (err) {
    throw err;
  }
  // Do this at the same time as iterating
  const filteredAds =  filterAds(adArray);
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
  // console.log(newAdArray.length);
  return newAdArray;
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
