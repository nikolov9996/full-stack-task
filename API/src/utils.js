const jwt = require("jsonwebtoken");

const formatInstruments = (instruments = []) => {
  try {
    const formatted = instruments.reduce((acc, cVal) => {
      const {
        id,
        symbol,
        name,
        market_data: {
          current_price: { usd },
        },
        last_updated,
      } = cVal;

      acc.push({
        id: id,
        instrument_symbol: symbol,
        instrument_name: name,
        usd_price: usd,
        updated_at: last_updated,
      });

      return acc;
    }, []);

    return formatted;
  } catch (error) {
    console.log(error);
  }
};

const validateEmail = (email) => {
  return (
    String(email)
      .toLowerCase()
      .match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/) || false
  );
};

module.exports = {
  formatInstruments,
  validateEmail,
};

module.exports.signJWT = (userData) => {
  const { id, email, instruments_access, created_at, updated_at } = userData;

  const signedToken = jwt.sign(
    { id, email, instruments_access, created_at, updated_at },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );

  return signedToken;
};
