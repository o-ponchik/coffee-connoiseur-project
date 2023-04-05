import { fetchCoffeeStores } from "@components/lib/coffee-stores";

const getCoffeeStoreByLocation = async (req, res) => {
  try {
    const { latLong, limit } = req.query;
    const response = await fetchCoffeeStores(latLong, limit);

    res.status(200);
    return res.json(response);
  } catch (error) {
    console.error("This is an error", error);

    res.status(500);
    res.json({ message: "Something went wrong", error });
  }

  // return
};

export default getCoffeeStoreByLocation;
