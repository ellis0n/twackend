const kijiji = require("kijiji-scraper");
const Ad = require("../model/Ad");
const User = require("../model/User");
const Vote = require("../model/Vote");

// Kijiji scraper functionality
const scrapeAds = async (req, res) => {
	console.log(req.body);
	const ads = await scrape(req.body);
	const jsonAds = JSON.stringify(ads);
	return res.status(200).json(jsonAds);
};

const scrape = async ({ params, user }) => {
	//TODO: Bring in listId, check the list for the ad, if it exists, don't return it. This is currently happening at the votes level, but it should be happening here instead.

	let adArray = [];
	try {
		const parameters = {
			locationId: JSON.parse(params.location),
			categoryId: JSON.parse(params.category),
			sortByName: "dateAsc",
		};

		const options = {
			minResults: 10,
		};

		const ads = await kijiji.search(parameters, options).then((scrapedAds) => {
			return scrapedAds;
		});

		const findVotes = await Vote.findOne({
			username: user,
		}).exec();

		for (let i = 0; i < ads.length; i++) {
			let ad = ads[i];

			let check = findVotes
				? findVotes.votes.for.includes(ad.id) ||
				  findVotes.votes.against.includes(ad.id)
				: false;

			if (!check) {
				if (ad.image && ad.attributes.price && ad.description) {
					newAdObj = {
						id: ad.id,
						img: ad.image,
						images: ad.images,
						title: ad.title.toUpperCase(),
						price: ad.attributes.price,
						url: ad.url,
						desc: ad.description,
						date: ad.date,
						location: ad.attributes.location,
						isScraped: ad.isScraped(),
					};
					adArray.push(newAdObj);
				}
			}
		}
	} catch (err) {
		throw err;
	}
	return adArray;
};

module.exports = {
	scrapeAds,
};
