const kijiji = require("kijiji-scraper");
const fsPromises = require("fs").promises;
const data = {
  ads: require("../model/ads.json"),
  setAds: function (data) {
    this.ads = data;
  },
};

const scrape = async () => {
  try {
    console.log("Scraping...");
    let adArray = [];

    const params = {
      locationId: 9008,
      categoryId: 16,
      sortByName: "dateDesc",
    };

const getAd = (req, res) => {
  const ad = data.ads[0];
  if (!ad) {
    return res.status(400).json({ message: `Ad Id ${req.body.id} not found` });
  }
  return adArray;
};

const getAllAds = async (req, res) => {
  let newAds = await scrape;
  const jsonString = JSON.stringify(newAds);
  fsPromises.writeFile("./model/ads.json", jsonString, (err) => {
    if (err) {
      console.log("Error writing file", err);
    } else {
      console.log("Successfully wrote file");
    }
  });
  data.setAds(newAds);
  return res.json(data.ads);
};

// const scrapeAds = (req, res) => {
//   let place = [];
//   data.setAds([]);
//   let newAds = scrape.scrape();
//   data.setAds([newstuff]);
//   res.json(data.ads);
// };

// const getAd = (req, res) => {
//   const ad = data.ads[0];
//   if (!ad) {
//     return res.status(400).json({ message: `Ad Id ${req.body.id} not found` });
//   }
//   res.json(ad);
// };

// const createNewAd = (req, res) => {
//   const newAd = {
//     id: data.ads[data.ads.length - 1].id,
//     img: data.ads[data.ads.length - 1].img,
//     title: data.ads[data.ads.length - 1].title,
//     price: data.ads[data.ads.length - 1].price,
//   };

//   if (!newAd.title || !newAd.price) {
//     return res.status(400).json({ message: "Bum ad..." });
//   }
//   data.setAds([...data.ads, newAd]);
//   res.status(201).json(data.ads);
// };

//Put
// const updateAd = (req, res) => {
//   const ad = data.ads.find((kijiji) => kijiji.id === parseInt(req.body.id));
//   if (!ad) {
//     return res.status(400).json({ message: `Ad ID ${req.body.id} not found` });
//   }
//   if (req.body.firstName) ad.firstName = req.body.firstName;
//   if (req.body.lastName) ad.lastName = req.body.lastName;
//   const filteredArray = data.ads.filter(
//     (ad) => ad.id !== parseInt(req.body.id)
//   );
//   const unsortedArray = [...filteredArray, ad];
//   data.setAds(
//     unsortedArray.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
//   );
//   res.json(data.ads);
// };

// Delete
// const deleteAd = (req, res) => {
//   const ad = data.ads.find((ad) => ad.id === parseInt(req.body.id));
//   if (!ad) {
//     return res.status(400).json({ message: `Ad Id ${req.body.id} not found` });
//   }
//   const filteredArray = data.ads.filter(
//     (ad) => ad.id !== parseInt(req.body.id)
//   );
//   data.setAds([...filteredArray]);
//   res.json(data.ads);
// };

module.exports = {
  // getAd,
  getAllAds,
  // createNewAd,
  // deleteAd,
  // updateAd,
  // scrapeAds,
};
