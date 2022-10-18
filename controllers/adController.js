const data = {
    ads: require('../model/ads.json'),
    setAds: function (data) {this.ads = data}
};

const createNewAd=(req,res)=>{
    const newAd = {
        id: data.ads[data.ads.length-1].id+1 || 1,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    }
    if (!newAd.firstName || !newAd.lastName){
        return res.status(400).json({'message': 'First and last names required.'})
    }
    data.setAds([...data.ads, newAd])
    res.status(201).json(data.ads)
}

// Get
const getAllAds = (req,res)=>{
    res.json(data.ads);
};

//Put
const updateAd = (req,res)=>{
    const ad = data.ads.find(kijiji => kijiji.id === parseInt(req.body.id));
    if (!ad){
        return res.status(400).json({"message": `Ad ID ${req.body.id} not found`});
    }
    if (req.body.firstName) ad.firstName = req.body.firstName;
    if (req.body.lastName) ad.lastName = req.body.lastName;
    const filteredArray = data.ads.filter(ad => ad.id !== parseInt(req.body.id));
    const unsortedArray = [...filteredArray,ad];
    data.setAds(unsortedArray.sort((a,b)=>a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
    res.json(data.ads)
}

//Delete
const deleteAd = (req,res)=>{
    const ad = data.ads.find(ad =>ad.id === parseInt(req.body.id));
    if (!ad) {
        return res.status(400).json({"message": `Ad Id ${req.body.id} not found`});
    }
     const filteredArray = data.ads.filter(ad => ad.id !== parseInt(req.body.id));
     data.setAds([...filteredArray]);
     res.json(data.ads);
};

const getAd = (req,res)=>{
    const ad = data.ads.find(ad=>ad.id === parseInt(req.params.id));
    if(!ad){
        return res.status(400).json({"message": `Ad Id ${req.body.id} not found`})
    }
    res.json(ad);
};

module.exports = {
    getAd,
    deleteAd,
    updateAd,
    getAllAds,
    createNewAd
}