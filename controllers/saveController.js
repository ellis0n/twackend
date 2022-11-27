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
  res.json(savedAds);
};

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

const deleteVote = async (req, res) => {
  const result = await Save.deleteOne({ id: req.body });
  res.status(200).json(result);
};

// const result = await Save.find({_id});
// const result =
//   deleteOne({
//     _id: ObjectID(_id),

// const deleteVote = async (req, res) => {
//   // const { _id } = req.body;
//   // console.log({ _id });
//   const ad = await Save.findOne({ _id: req.body.id }).exec();
//   // if (!ad) {
//   //   return res.status(204).json({ message: `No ad matches ${req.body.id}` });
//   // }
//   const result = await ad.deleteOne({ _id: req.body.id });
// };

module.exports = {
  saveAd,
  getAllSavedAds,
  updateVote,
  deleteVote,
};
