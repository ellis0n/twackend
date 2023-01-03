const kijiji = require("kijiji-scraper");
const Ad = require("../model/Ad");
const User = require("../model/User");

// Kijiji scraper functionality
const scrapeAds = async (req, res) => {
  const ads = await scrape(req.body);
  const jsonAds = JSON.stringify(ads);
  return res.status(200).json(jsonAds);
};

const scrape = async ({ params, user }) => {
  // console.log(params);
  // console.log(user);
  let adArray = [];
  try {
    const parameters = {
      locationId: JSON.parse(params.location),
      categoryId: JSON.parse(params.category),
      sortByName: "dateAsc",
    };

    const options = {
      minResults: 20,
    };

    const ads = await kijiji.search(parameters, options).then((scrapedAds) => {
      return scrapedAds;
    });

    const findUser = await User.findOne({
      username: user,
    }).exec();

    for (let i = 0; i < ads.length; i++) {
      let ad = ads[i];
      let check = findUser ? findUser.votes.includes(ad.id) : false;
      if (!check) {
        if (ad.image && ad.attributes.price && ad.description) {
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
            isScraped: ad.isScraped(),
          };
          adArray.push(newAdObj);
        }
      }
    }
  } catch (err) {
    throw err;
  }
  return adArray;
};

module.exports = {
  scrapeAds,
};
