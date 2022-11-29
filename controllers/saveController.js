const Save = require("../model/Save");

//  POST ad once voted on
const saveAd = async (req, res) => {
  try {
    const result = await Save.create({
      ad: req.body.ad,
      vote: req.body.vote,
    });
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
  }
};

//  GET all ads the user has voted on
const getAllSavedAds = async (req, res) => {
  const savedAds = await Save.find();
  if (!savedAds)
    return res.status(204).json({ message: "No saved ads found." });
  res.json(savedAds);
};

//  PUT or update individual saved ad
const updateVote = async (req, res) => {
  try {
    const ad = await Save.findOne({ id: req.body.id }).exec();
    if (!ad) {
      return res.status(204).json({ message: `No ad matches ${req.body.id}` });
    }
    ad.vote = req.body.vote;
    const result = await ad.save();
    res.json(ad);
  } catch (err) {
    console.error(err);
  }
};

//  DELETE individual saved ad
const deleteVote = async (req, res) => {
  const result = await Save.deleteOne({ id: req.body });
  res.status(200).json(result);
};

module.exports = {
  saveAd,
  getAllSavedAds,
  updateVote,
  deleteVote,
};
