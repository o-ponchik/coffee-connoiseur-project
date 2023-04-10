import { table, getMinifiedRecords, findRecordById } from "../../lib/airtable";

const createCoffeeStore = async (req, res) => {
  if (req.method === "POST") {
    const { id, name, address, neighbourhood, voting, imgUrl } = req.body;

    try {
      if (id) {
        // find a record
        const records = await findRecordById(id);

        // if it exists - return
        if (records.length !== 0) {
          // if it exists - return

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
                  voting: 0,
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
      res.status(500);
      res.json({ message: "Error creating or finding store", error });
    }
  }
};

export default createCoffeeStore;
