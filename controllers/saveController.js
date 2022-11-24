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
  if (!employees)
    return res.status(204).json({ message: "No saved ads found." });
  res.json(savedAds);

  const saveFile = path.join(__dirname, "..", "model", "ads.json");
  fs.readFile(saveFile, "utf-8", (error, data) => {
    if (error) throw error;
    let ads = JSON.parse(data);
    res.status(200).json(ads);
  });
};

module.exports = {
  saveAd,
  getAllSavedAds,
};
