const cron = require("node-cron");
const { InstrumentModel } = require("./models/instrument.model");
const { getInstruments } = require("./services");
const { formatInstruments } = require("./utils");

const updateInstruments = () => {
  cron.schedule("*/5 * * * * *", async () => {
    try {
      let bulkOps = [];

      const { data: instruments } = await getInstruments();
      const formatted = formatInstruments(instruments);
      const current = await InstrumentModel.find({});

      if (current.length) {
        formatted.map((doc) => {
          let upsertDoc = {
            updateOne: {
              filter: { id: doc.id },
              update: doc,
              upsert: true,
            },
          };

          bulkOps.push(upsertDoc);
        });
        const edited = await InstrumentModel.bulkWrite(bulkOps);
        console.log(edited);
      } else {
        const withCreated = formatted.map((x) => {
          return { ...x, created_at: new Date() };
        });
        await InstrumentModel.insertMany(withCreated);
      }
    } catch (error) {
      console.log(error);
    }
  });
};

module.exports.updateInstruments = updateInstruments;
