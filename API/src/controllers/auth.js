const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");
const { validateEmail, signJWT } = require("../utils");

const register = async (req, res) => {
  const { email, password, rePassword } = req.body;
  const isValidEmail = validateEmail(email);

  if (!isValidEmail) {
    return res.status(400).send("invalid email");
  }
  if (password !== rePassword) {
    return res.status(400).send("password and repeat password must match");
  }

  const doExist = await UserModel.findOne({ email: email });
  console.log(doExist);
  if (doExist) {
    return res.status(400).send("user with this email already exist");
  }

  const user = await UserModel.create({ email, password });

  const jwt = signJWT(user);

  res.send({
    id: user.id,
    email: user.email,
    instruments_access: user.instruments_access,
    created_at: user.created_at,
    updated_at: user.updated_at,
    token: jwt,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email: email });

  if (!user) {
    return res.status(400).send("user with this email do not exist");
  }

  user.comparePassword(password, async (err, isMatch) => {
    if (err) return res.status(400).send("wrong password");

    const user = await UserModel.create({ email, password });

    const jwt = signJWT(user);

    res.send({
      id: user.id,
      email: user.email,
      instruments_access: user.instruments_access,
      created_at: user.created_at,
      updated_at: user.updated_at,
      token: jwt,
    });
  });
};

const sessionVerify = (req, res) => {
  const { authorization } = req.headers;
  jwt.verify(
    authorization.replace("Bearer ", ""),
    process.env.JWT_SECRET,
    function (err, decoded) {
      if (err) return res.status(401).send("Unauthorized");
      res.send("ok");
    }
  );
};

module.exports = {
  register,
  login,
  sessionVerify,
};
