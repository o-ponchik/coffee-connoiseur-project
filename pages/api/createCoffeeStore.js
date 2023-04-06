const Airtable = require("airtable");

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_TOKEN }).base(
  process.env.AIRTABLE_BASE_ID
);

const table = base("Coffee-stores");

console.log({ table });

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

        const records = findCoffeeStoreRecords.map((record) => {
          return { ...record.fields };
        });

        console.log({ records });

        if (findCoffeeStoreRecords.length !== 0) {
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
                  voting,
                  imgUrl,
                },
              },
            ]);

            const records = createdRecord.map((record) => {
              return { ...record.fields };
            });

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
