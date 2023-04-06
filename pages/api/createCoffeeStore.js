import { table, getMinifiedRecords } from "../../lib/airtable";

const createCoffeeStore = async (req, res) => {
  if (req.method === "POST") {
    const { id, name, address, neighbourhood, voting, imgUrl } = req.body;

    try {
      if (id) {
        // find a record
        const findCoffeeStoreRecords = await table
          .select({
            filterByFormula: `id=${id}`,
          })
          .firstPage();

        if (findCoffeeStoreRecords.length !== 0) {
          // if it exists - return
          const records = getMinifiedRecords(findCoffeeStoreRecords);

          res.json(records);
        } else {
          // if it doesn't exist - create a record
          if (name) {
            const createdRecord = await table.create([
              {
                fields: {
                  id,
                  name,
                  address,
                  neighbourhood,
                  voting,
                  imgUrl,
                },
              },
            ]);

            const records = getMinifiedRecords(createdRecord);

            res.json({ message: "create a record", records });
          } else {
            res.status(400);
            res.json({ message: "ID or name is missing" });
          }
        }
      } else {
        res.status(400);
        res.json({ message: "ID is missing" });
      }
    } catch (error) {
      console.log("Error creating or finding store", error);
      res.status(500);
      res.json({ message: "Error creating or finding store", error });
    }
  }
};

export default createCoffeeStore;
