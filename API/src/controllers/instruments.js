const { InstrumentModel } = require("../models/instrument.model");

const allInstruments = async (req, res) => {
  try {
    const instruments = await InstrumentModel.find({});
    res.send(instruments);
  } catch (error) {
    console.error(error);
    res.status(500).send("something went wrong, try again later");
  }
};

const instrument = async (req, res) => {
  try {
    const { symbol } = req.params;
    if (!symbol || !symbol.length) {
      return res.status(400).send("symbol missing");
    }
    const instrument = await InstrumentModel.findOne({
      instrument_symbol: symbol,
    });

    if (!instrument) {
      return res.status(403).send("instrument not found");
    }

    res.send(instrument);
  } catch (error) {
    console.error(error);
    res.status(500).send("something went wrong, try again later");
  }
};

module.exports = {
  allInstruments,
  instrument,
};
