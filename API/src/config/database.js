const express = require("express");
const app = express();
const port = 3000 || process.env.PORT;
const { connect } = require("mongoose");
require("dotenv").config();

const connectMongo = () =>
  connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "task",
  })
    .then(console.log("mongodb connected!"))
    .catch((e) => console.log("error connecting to mongodb: " + e));

app.listen(port, () => {
  console.log(`App started...`);
  connectMongo();
  console.log(`App listening on port ${port}...`);
});

module.exports.app = app;
