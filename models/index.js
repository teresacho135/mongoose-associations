const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/associations', { useNewUrlParser: true } );

module.exports = {
    Food : require('./food'),
    Ingredient: require('./ingredient'),
}