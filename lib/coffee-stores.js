import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
});

const getListOfCoffeeShopsPhotos = async () => {
  const photos = await unsplash.search.getPhotos({
    query: "coffee shop",
    page: 1,
    perPage: 30,
  });

  const unsplashResults = photos.response.results;

  return unsplashResults.map((result) => result.urls["small"]);
};

const getUrlForCoffeeStores = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}%20stores&ll=${latLong}&limit=${limit}`;
};

export const fetchCoffeeStores = async () => {
  const photos = await getListOfCoffeeShopsPhotos();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.FOURSQUARE_API_KEY,
    },
  };

  const response = await fetch(
    getUrlForCoffeeStores("43.64%2C-79.38", "coffee", 10),
    options
  );

  const data = await response.json();

  // .catch((err) => console.error(err));

  const neighbourhood = result.location.locality;

  return data.results.map((result, index) => {
    return {
      id: result.fsq_id,
      name: result.name,
      address: result.location.address,
      neighbourhood: neighbourhood.length > 0 ? neighbourhood[0] : "",
      imgUrl: photos.length > 0 ? photos[index] : null,
    };
  });
};
