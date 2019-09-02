const express = require("express");
const apartments = require("../routes/apartments");
const users = require("../routes/users");
const hosts = require("../routes/hosts");
const auth = require("../routes/auth");
const hostAuth = require("../routes/hostAuth");
const error = require("../middleware/error");

module.exports = function(app) {
  app.use(express.json());
  app.use("/api/apartments", apartments);
  app.use("/api/users", users);
  app.use("/api/hosts", hosts);
  app.use("/api/auth", auth);
  app.use("/api/hostauth", hostAuth);
  app.use(error);
};
