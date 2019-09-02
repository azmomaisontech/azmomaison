const { Apartment, validate } = require("../models/apartment");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + file.originalname);
  }
});

// const upload = multer({ dest: "uploads/" });

const upload = multer({ storage: storage });

router.get("/", async (req, res) => {
  const apartments = await Apartment.find().sort("name");
  res.send(apartments);
});

router.post("/", admin, upload.single("apartmentImage"), async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let apartment = new Apartment({
    name: req.body.name,
    address: req.body.address,
    price: req.body.price,
    contact: req.body.contact
  });
  apartment = await apartment.save();
  res.send(apartment);
});

router.put("/:id", admin, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const apartment = await Apartment.findByIdAndUpdate(
    req.param.id,
    {
      name: req.body.name,
      address: req.body.address,
      price: req.body.price,
      contact: req.body.contact
    },
    { new: true }
  );

  if (!apartment)
    return res
      .status(404)
      .send("The Apartment with the given ID was not found");

  res.send(apartment);
});

router.delete("/:id", admin, async (req, res) => {
  const apartment = await Apartment.findByIdAndRemove(req.param.id);

  if (!apartment)
    return res
      .status(404)
      .send("The Apartment with the given ID was not found.");

  res.send(apartment);
});

router.get("/:id", async (req, res) => {
  const apartment = await Apartment.findById(req.params.id).select("-__v");

  if (!apartment)
    return res
      .status(404)
      .send("The apartment with the given ID was not found");

  res.send(apartment);
});

module.exports = router;
