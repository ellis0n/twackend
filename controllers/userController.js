const saveAd = async (req,res) => {
    console.log(req.body.vote)
    return res.status(200)
}

module.exports = {
    saveAd
}