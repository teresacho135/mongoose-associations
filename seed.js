const db = require("./models");

const cheddar = {
    title: 'cheddar cheese',
    origin: 'Wisconsin'
   };

const cheesyQuiche = {
    name: 'Quiche',
    ingredients: []
  };

db.Food.remove({}, function(err, foods){
  db.Ingredient.remove({}, function(err,ingreds){});
  db.Ingredient.create( cheddar , (err, savedCheese) => {
      if (err) {
        return console.log(err);
      } else {
        console.log('cheddar saved successfully');
        db.Food.create(cheesyQuiche, (err, savedQuiche) => {
          if (err) {
            return console.log(err);
          }
          savedQuiche.ingredients.push(savedCheese);   // associated!
          savedQuiche.save( (err, savedCheesyQuiche) => {
            if (err) {
              return console.log(err);
            } else {
              console.log('cheesyQuiche food is ', savedCheesyQuiche);
            }
          });
        })
      }
    });
  });