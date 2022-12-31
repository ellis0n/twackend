const Save = require("../model/Save");
const User = require("../model/User");

//  POST ad once voted on
const saveVote = async (req, res) => {
  let { vote, ad } = req.body.vote;
  let { user } = req.body;

  try {
    const userCheck = await User.findOne({
      username: user,
    }).exec();

    if (vote === true) {
      userCheck.votes.for.push(ad);
    } else if (vote === false) {
      userCheck.votes.against.push(ad);
    }
    const result = await userCheck.save();
    console.log(result);

    const saveCheck = await Save.findOne({
      ad: ad,
    }).exec();

    let saveResult;

    if (saveCheck && vote === true) {
      saveCheck.votes.for.push(req.body.user);
      saveResult = await saveCheck.save();
    } else if (saveCheck && vote === false) {
      saveCheck.votes.against.push(req.body.user);
      saveResult = await saveCheck.save();
    } else if (!saveResult) {
      saveResult = await Save.create({
        ad: req.body.vote.ad,
        votes: {
          for: vote === true ? [req.body.user] : [],
          against: vote === false ? [req.body.user] : [],
        },
      });
    }
    res.status(201).json(saveResult);
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
    const ad = await Save.findOne({ ad: req.body.ad }).exec();
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
  const result = await Save.deleteOne({ ad: req.body.ad });
  res.status(200).json(result);
};

module.exports = {
  saveVote,
  getAllSavedAds,
  updateVote,
  deleteVote,
};
