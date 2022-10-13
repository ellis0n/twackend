const params = {
    locationId: 1700185, // Same as kijiji.locations.ONTARIO.OTTAWA_GATINEAU_AREA.OTTAWA
    categoryId: 27, // Same as kijiji.categories.CARS_AND_VEHICLES
    sortByName: "priceAsc", // Show the cheapest listings first
  };

  // Scrape using returned promise
  kijiji
    .search(params, options)
    .then((ads) => {
      // Use the ads array
      for (let i = 0; i < ads.length; ++i) {
        console.log(ads[i].title);
      }
    })
    .catch(console.error);

  // Scrape using optional callback parameter
  function callback(err, ads) {
    if (!err) {
      // Use the ads array
      for (let i = 0; i < ads.length; ++i) {
        console.log(ads[i].title);
      }
    }
  }
  kijiji.search(params, options, callback);