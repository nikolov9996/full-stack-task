var { expressjwt } = require("express-jwt");
const { ROOT_ROUTES, ROUTES } = require("../constants");

module.exports.jwt = () => {
  return expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
  }).unless({
    path: [
      `${ROOT_ROUTES.USER}${ROUTES.LOGIN}`,
      `${ROOT_ROUTES.USER}${ROUTES.REGISTER}`,
      "/users/token",
    ],
  });
};
