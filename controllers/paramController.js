const Param = require("../model/Param");
const Save = require("../model/Save");

const updateParam = async (req, res) => {

  try {
    const settings = await Param.findOne({userId: 0})
    console.log(req.body)
    settings.userId = settings.userId;
    settings.location = req.body.location;
    settings.category = req.body.category;
    const result = await settings.save()
    res.json(result);
  }
  catch (err) {
    console.error(err);
    }

};

const getParam = async (req, res) => {
  try{
    let param = await Param.find();
    res.json(param) 
  } 
  catch (err) {
    console.log(err)
  }
}

module.exports = { updateParam, getParam };