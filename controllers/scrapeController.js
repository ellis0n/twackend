const kijiji = require("kijiji-scraper");
const Ad = require("../model/Ad");
const User = require("../model/User");
const Vote = require("../model/Vote");
const List = require("../model/List");

// Kijiji scraper functionality
const scrapeAds = async (req, res) => {
	console.log(req.body);
	const ads = await scrape(req.body);
	const jsonAds = JSON.stringify(ads);
	return res.status(200).json(jsonAds);
};

const scrape = async ({ params, user }) => {
	//TODO: Need a way to filter ads that are not in the list but have been voted on to not see. Blocked ads? Hide ads? Not sure yet.

	let adArray = [];
	try {
		// Required to be passed to the scrape function
		const parameters = {
			locationId: JSON.parse(params.location),
			categoryId: JSON.parse(params.category),
			sortByName: "dateAsc",
		};

		//TODO: Make this a user preference passed in per request
		const options = {
			minResults: 10,
		};

		const ads = await kijiji.search(parameters, options).then((scrapedAds) => {
			return scrapedAds;
		});

		const list = await List.findOne({
			listId: params.listId,
		}).exec();

		// Filter ads to only include those that have not been included in the list
		for (let i = 0; i < ads.length; i++) {
			let ad = ads[i];

			// Check if list already contains ad
			const check = list.ads.some((a) => a.id === ad.id);

			// If ad has not been voted, add it to the returned array
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
