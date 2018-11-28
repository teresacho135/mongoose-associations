const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
    title: {
      type: String,
      default: ""
    },
    origin: {
      type: String,
      default: ""
    }
  });

  const Ingredient = mongoose.model('Ingredient', ingredientSchema);
  module.exports = Ingredient;