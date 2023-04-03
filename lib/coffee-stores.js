const getUrlForCoffeeStores = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}%20stores&ll=${latLong}&limit=${limit}`;
};

export const fetchCoffeeStores = async () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.API_KEY,
    },
  };

  const response = await fetch(
    getUrlForCoffeeStores("43.64%2C-79.38", "coffee", 6),
    options
  );

  const data = await response.json();

  console.log(data.results);

  // .catch((err) => console.error(err));

  return data.results;
};
