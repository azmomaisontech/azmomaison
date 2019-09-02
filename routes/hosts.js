const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { Host, validate } = require("../models/host");
const express = require("express");
const router = express.Router();

router.get("/me", auth, async (req, res) => {
  const host = await Host.findById(req.host._id).select("-password");
  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let host = await Host.findOne({ email: req.body.email });
  if (host) return res.status(400).send("User already registered");

  host = new Host(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  host.password = await bcrypt.hash(host.password, salt);
  await host.save();

  const token = host.generateAuthToken();
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(_.pick(host, ["_id", "name", "email"]));
});

module.exports = router;
