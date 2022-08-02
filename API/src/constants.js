module.exports.ROUTES = {
  GET_ALL_INSTRUMENTS: "/instruments",
  GET_INSTRUMENT: "/instruments/:symbol",
  REGISTER: "/register",
  LOGIN: "/login",
  SESSION_VERIFY: "/session_verify",
};

module.exports.ROOT_ROUTES = {
  USER: "/users",
};

module.exports.SALT_ROUNDS = 6