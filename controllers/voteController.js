const Ad = require("../model/Ad");
const User = require("../model/User");
const Vote = require("../model/Vote");

//  POST ad once voted on
const saveVote = async (req, res) => {
  let { vote, ad } = req.body.vote;
  let { user } = req.body;

  try {
    // Add vote to user's vote history
    const findVotes = await Vote.findOne({
      username: user,
    }).exec();

    vote === true
      ? findVotes.votes.for.push(ad.id)
      : findVotes.votes.against.push(ad.id);

    const saveVoteResult = await findVotes.save();

    // Check if ad is already saved in database
    // If not, save it
    // TODO: Use ad.isScraped to only check scraped ads from Kijiji when user content is added
    // TODO: Only search for ad.id

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
  } catch (err) {
    throw err;
  }
};
//  GET all ads the user has voted on
const getAllSavedAds = async (req, res) => {
  let userVotesArray = [];
  // Find user from JWT
  const user = await User.findOne({ refreshToken: req.cookies.jwt }).exec();
  // Find user's votes
  const userVotes = await Vote.findOne({ username: user.username }).exec();

  let forVote = userVotes.votes.for;
  let againstVote = userVotes.votes.against;
  // console.log(forVote);
  try {
    forVote.forEach(async (vote) => {
      try {
        // console.log(vote);
        const ad = await Ad.findOne({ id: vote }).exec();
        ad.ad.vote = true;
        // console.log(ad);
        userVotesArray.push(ad.ad);
      } catch (err) {
        console.error(err);
      }
    });

    againstVote.forEach(async (vote) => {
      try {
        const ad = await Ad.findOne({ id: vote }).exec();
        ad.ad.vote = true;
        userVotesArray.push(ad.ad);
      } catch (err) {
        console.error(err);
      }
    });
    console.log(userVotesArray);

    if (!userVotesArray) {
      return res.status(204).json({ message: "No saved ads found." });
    }

    res.status(200).json(userVotesArray);
  } catch (err) {
    console.error(err);
  }
  console.log(userVotesArray);
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
