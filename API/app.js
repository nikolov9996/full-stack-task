const { app } = require("./src/config/database");
const { ROOT_ROUTES } = require("./src/constants");
const { updateInstruments } = require("./src/cron");
const { checkToken } = require("./src/middlewares");
const { users, mainRouter } = require("./src/router/index");
const express = require("express");
const { jwt } = require("./src/config/jwt");
var cors = require('cors');

updateInstruments();

app.get("/", (req, res) => {
  res.send("home here");
});

app.use(cors({
  origin: 'http://localhost:5001'
}));

app.use(jwt());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(checkToken);
app.use(ROOT_ROUTES.USER, users);
app.use(mainRouter);
