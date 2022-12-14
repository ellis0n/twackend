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

    const ads = await kijiji.search(params, options).then((scrapedAds) => { return scrapedAds });
    // console.log(ads.length)

    for (let i = 0; i < ads.length; i++) {
      let ad = ads[i];
      console.log(ad)
      let search = await Save.findOne({ 'ad.id': ad.id }).exec();
      if (!search) {{
        if (ad.image &&
            ad.attributes.price && 
            ad.description){

              newAdObj = {
              id: ad.id,
              img: ad.image,
              //images: ad.images 
              title: ad.title.toUpperCase(),
              price: ad.attributes.price,
              url: ad.url,
              desc: ad.description,
              date: ad.date,
              location: ad.attributes.location,
              isScraped: ad.isScraped()
            };
          console.log(newAdObj)
          adArray.push(newAdObj);
          }
        }
      }
    }
    // console.log(adArray.length)
  } catch (err) {
    throw err;
  }
  return adArray
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
