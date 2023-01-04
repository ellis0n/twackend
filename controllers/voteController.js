const Ad = require("../model/Ad");
const User = require("../model/User");
const Vote = require("../model/Vote");

//  POST ad once voted on
const saveVote = async (req, res) => {
  let { vote, ad } = req.body.vote;
  let { user } = req.body;
  try {
    //
    const findVotes = await Vote.findOne({
      username: user,
    }).exec();

    // Add ad to user's vote history
    vote === true
      ? findVotes.votes.for.push(ad.id)
      : findVotes.votes.against.push(ad.id);
    const saveVoteResult = await findVotes.save();

    // Check if ad is already saved
    const adCheck = await Ad.findOne({
      ad: ad,
    }).exec();

    // If ad is not saved, save it
    if (!adCheck) {
      const saveResult = await Ad.create({
        ad: ad,
        votes: {
          for: vote === true ? 1 : 0,
          against: vote === false ? 1 : 0,
        },
      });
      return res.status(200).json(saveResult);
    }

    // If ad is already saved, update vote tally
    if (adCheck && vote === true) {
      adCheck.votes.for += 1;
      const saveResult = await adCheck.save();
      return res.status(200).json(saveResult);
    }
    if (adCheck && vote === false) {
      adCheck.votes.against += 1;
      const saveResult = await adCheck.save();
      return res.status(200).json(saveResult);
    }

    // Handle error
  } catch (err) {
    throw err;
  }
};

// GET all saved ads
const getAllSavedAds = async (req, res) => {
  // Find user's vote history
  try {
    const user = await User.findOne({ refreshToken: req.cookies.jwt }).exec();
    const userVotes = await Vote.findOne({ username: user.username }).exec();
    let forVote = userVotes.votes.for;
    let againstVote = userVotes.votes.against;

    // Find all ads that match user's vote history
    const ads = await Ad.find({
      id: { $in: [...forVote, ...againstVote] },
    }).exec();

    // Add vote property to each ad
    const savedAds = ads.map((ad) => {
      console.log(forVote);
      console.log(ads);
      if (forVote.includes(ad.ad.id)) {
        return { ...ad.ad, vote: true };
      } else {
        return { ...ad.ad, vote: false };
      }
    });
    // Return all saved ads
    res.json(savedAds);
  } catch (err) {
    throw err;
  }
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
