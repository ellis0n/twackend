const kijiji = require("kijiji-scraper");
const Save = require("../model/Save");
const User = require("../model/User");

// Scraper function

const scrapeAds = async (req, res) => {
  console.log(req.body);
  const ads = await scrape(req.body);
  const jsonAds = JSON.stringify(ads);
  return res.status(200).json(jsonAds);
};

const scrape = async ({ params, user }) => {
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

    for (let i = 0; i < ads.length; i++) {
      let ad = ads[i];
      // console.log(findUser);
      const findUser = await User.findOne({
        username: user,
      }).exec();

      let check = findUser ? findUser.votes.for.includes(ad.id) : false;
      console.log(`vote for check: ${check}`);
      if (!check) {
        check = findUser ? findUser.votes.against.includes(ad.id) : false;
        console.log(`vote against check: ${check}`);
        if (!check) {
          {
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
              // console.log(newAdObj)
              adArray.push(newAdObj);
            }
          }
        }
      }
    }
    // console.log(adArray.length)
  } catch (err) {
    throw err;
  }
  return adArray;
};

module.exports = {
  scrapeAds,
};
