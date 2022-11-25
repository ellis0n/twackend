const Save = require("../model/Save");

const saveAd = async (req, res) => {
  try {
    const result = await Save.create({
      ad: JSON.parse(req.body.ad),
      vote: req.body.vote,
    });
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
  }
};

const getAllSavedAds = async (req, res) => {
  const savedAds = await Save.find();
  if (!savedAds)
    return res.status(204).json({ message: "No saved ads found." });
  console.log(savedAds);
  res.json(savedAds);
};

module.exports = {
  saveAd,
  getAllSavedAds,
};
