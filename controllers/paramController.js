const Param = require("../model/Param");

const updateParam = async (req, res) => {
  console.log(req)
  try {
    let setting = await Param.find();
    setting.location = req.body.location;
    setting.category = req.body.category
    const result = await setting.save()
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