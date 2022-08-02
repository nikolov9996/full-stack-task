const { Schema, model } = require("mongoose");

const InstrumentSchema = new Schema({
  id: String,
  instrument_symbol: String,
  instrument_name: String,
  usd_price: String,
  updated_at: Date,
  created_at: Date,
});

module.exports.InstrumentModel = new model("Instruments", InstrumentSchema);
