const Ad = require("../model/Ad");
const User = require("../model/User");

//  POST ad once voted on
const saveVote = async (req, res) => {
  let { vote, ad } = req.body.vote;
  let { user } = req.body;

  try {
    // Log vote to user document to prevent duplicate ads
    const userCheck = await User.findOne({
      username: user,
    }).exec();

    userCheck.votes.push(ad.id);
    const saveUserResult = await userCheck.save();

    const saveCheck = await Ad.findOne({
      ad: ad,
    }).exec();

    if (!saveCheck) {
      const saveResult = await Ad.create({
        ad: ad,
        votes: {
          for: vote === true ? [user] : [],
          against: vote === false ? [user] : [],
        },
      });
      return res.status(200).json(saveResult);
    }

    // If ad is already saved, update vote tally
    if (saveCheck && vote === true) {
      saveCheck.votes.for.push(user);
      const saveResult = await saveCheck.save();
    }
    if (saveCheck && vote === false) {
      saveCheck.votes.against.push(user);
      const saveResult = await saveCheck.save();
    }
    return res.status(200).json(saveResult);
  } catch (err) {
    throw err;
  }
};
//  GET all ads the user has voted on
const getAllSavedAds = async (req, res) => {
  const savedAds = await Ad.find();
  if (!savedAds)
    return res.status(204).json({ message: "No saved ads found." });
  res.json(savedAds);
};

//  PUT or update individual saved ad
const updateVote = async (req, res) => {
  try {
    const ad = await Ad.findOne({ ad: req.body.ad }).exec();
    if (!ad) {
      return res.status(204).json({ message: `No ad matches ${req.body.id}` });
    }
    ad.vote = req.body.vote;
    const result = await ad.save();
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
  }
};

//  DELETE individual saved ad
const deleteVote = async (req, res) => {
  const result = await Ad.deleteOne({ ad: req.body.ad });
  res.status(200).json(result);
};

module.exports = {
  saveVote,
  getAllSavedAds,
  updateVote,
  deleteVote,
};
