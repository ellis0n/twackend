const scrape = require("./scrapeController");

const data = {
  ads: require("../model/ads.json"),
  setAds: function (data) {
    this.ads = data;
  },
};

const scrapeAds = (req, res) => {
  let place = [];
  data.setAds([]);
  let newstuff = scrape.scrape()
  data.setAds([newstuff]);
  res.json(data.ads);
};

const getAllAds = (req, res) => {
  scrape;
  data.setAds([])
  return res.json(data.ads);
};

const getAd = (req, res) => {
  const ad = data.ads[0];
  if (!ad) {
    return res.status(400).json({ message: `Ad Id ${req.body.id} not found` });
  }
  res.json(ad);
};

const createNewAd = (req, res) => {
  const newAd = {
    id: data.ads[data.ads.length - 1].id,
    img: data.ads[data.ads.length - 1].img,
    title: data.ads[data.ads.length - 1].title,
    price: data.ads[data.ads.length - 1].price,
  };
  if (!newAd.title || !newAd.price) {
    return res.status(400).json({ message: "Bum ad..." });
  }
  data.setAds([...data.ads, newAd]);
  res.status(201).json(data.ads);
};

//Put
const updateAd = (req, res) => {
  const ad = data.ads.find((kijiji) => kijiji.id === parseInt(req.body.id));
  if (!ad) {
    return res.status(400).json({ message: `Ad ID ${req.body.id} not found` });
  }
  if (req.body.firstName) ad.firstName = req.body.firstName;
  if (req.body.lastName) ad.lastName = req.body.lastName;
  const filteredArray = data.ads.filter(
    (ad) => ad.id !== parseInt(req.body.id)
  );
  const unsortedArray = [...filteredArray, ad];
  data.setAds(
    unsortedArray.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
  );
  res.json(data.ads);
};

// Delete
const deleteAd = (req, res) => {
  const ad = data.ads.find((ad) => ad.id === parseInt(req.body.id));
  if (!ad) {
    return res.status(400).json({ message: `Ad Id ${req.body.id} not found` });
  }
  const filteredArray = data.ads.filter(
    (ad) => ad.id !== parseInt(req.body.id)
  );
  data.setAds([...filteredArray]);
  res.json(data.ads);
};

module.exports = {
  getAd,
  getAllAds,
  createNewAd,
  deleteAd,
  updateAd,
  scrapeAds,
};
