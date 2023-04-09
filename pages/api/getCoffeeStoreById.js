import { getMinifiedRecords, findRecordById } from "../../lib/airtable";

const getCoffeeStoreById = async (req, res) => {
  const { id } = req.query;

  try {
    if (id) {
      const records = await findRecordById(id);

      if (records.length !== 0) {
        // if it exists - return

        res.json(records);
      } else {
        res.json({ message: `id coudn't be found` });
      }
    } else {
      res.status(400);
      res.json({ message: "ID is missing" });
    }
  } catch (error) {
    res.status(500);
    res.json({ message: "Something went wrong", error });
  }
};

export default getCoffeeStoreById;
