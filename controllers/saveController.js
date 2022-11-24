const Save = require("../model/Save");

const saveAd = async (req, res) => {
  console.log(req.body);
  try {
    const result = await Save.create({
      id: req.body.id,
      vote: req.body.vote,
    });
    console.log(result);
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

  console.log(req.body);
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
