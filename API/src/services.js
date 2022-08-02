const axios = require("axios").default;

const getInstruments = async () => {
  const resp = await axios.get("https://api.coingecko.com/api/v3/coins");
  return resp;
};

module.exports = {
  getInstruments,
};
