import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});

const getListOfCoffeeShopsPhotos = async () => {
  const photos = await unsplash.search.getPhotos({
    query: "coffee shop",
    page: 1,
    perPage: 40,
  });

  console.log("photos: ", photos.response.results);

  const unsplashResults = photos.response?.results || [];

  return unsplashResults.map((result) => result.urls["small"]);
};

const getUrlForCoffeeStores = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}%20stores&ll=${latLong}&limit=${limit}`;
};

export const fetchCoffeeStores = async (
  latLong = "43.64%2C-79.38",
  limit = 10
) => {
  const photos = await getListOfCoffeeShopsPhotos();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
    },
  };

  const response = await fetch(
    getUrlForCoffeeStores(latLong, "coffee", limit),
    options
  );

  const data = await response.json();

  // .catch((err) => console.error(err));

  return data.results.map((result, index) => {
    const neighbourhood = result.location.locality;

    return {
      id: result.fsq_id,
      name: result.name,
      address: result.location.address,
      neighbourhood: neighbourhood.length > 0 ? neighbourhood : "",
      imgUrl: photos.length > 0 ? photos[index] : null,
    };
  });
};
