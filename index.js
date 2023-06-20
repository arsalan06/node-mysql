const express = require("express");
require("dotenv").config();
var bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
const authRoute = require("./routes/authRoute")
app.use("/api/v1", authRoute);


// db.Sequelize.sync({ force: true, logging: false }).then((res)=>{
  module.exports = app;

// });
