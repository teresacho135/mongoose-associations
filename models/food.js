const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodSchema = new Schema({
    name: {
      type: String,
      default: ""
    },
    ingredients: [{
      type: Schema.Types.ObjectId,  //REFERENCING :D
      ref: 'Ingredient'
    }]
  });

  const Food = mongoose.model('Food', foodSchema);
  module.exports = Food;