const Joi = require("Joi");
const mongoose = require("mongoose");

const Apartment = mongoose.model(
  "Apartment",
  new mongoose.Schema({
    name: { type: String, required: true, minlength: 5, maxlength: 1024 },
    address: { type: String, required: true, minlength: 5, maxlength: 1024 },
    price: { type: String, required: true, minlength: 5, maxlength: 20 },
    contact: { type: String, required: true, minlength: 5, maxlength: 20 }
  })
);

function validateApartment(apartment) {
  const schema = {
    name: Joi.string()
      .min(5)
      .max(1024)
      .required(),
    address: Joi.string()
      .min(5)
      .max(1024)
      .required(),
    price: Joi.string()
      .min(5)
      .max(20)
      .required(),
    contact: Joi.string()
      .min(5)
      .max(20)
      .required()
  };

  return Joi.validate(apartment, schema);
}

exports.Apartment = Apartment;
exports.validate = validateApartment;
