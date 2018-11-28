// require express and other modules
const 
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    db = require('./models');

app.use(bodyParser.urlencoded({ extended: true }));

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/*
 * HTML Endpoints
 */

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

/*
 * Response Endpoints
 */

// Index foods //
app.get('/api/foods/', (req, res) => {
    db.Food.find({ })
      .populate('ingredients')
      .exec((err, foods) => {
        if (err) {
          res.status(500).send(err);
        }
        console.log('found and populated all foods: ', foods);
        res.json(foods);
      });
  });

// Get one Food //
app.get('/api/foods/:id', (req, res) => {
  let foodId = req.params.id;
  db.Food.findOne({ _id: foodId })
  .populate('ingredients')
  .exec((err, foundFood) => {
    if(err) { return console.log(err) }
    res.json(foundFood);
})
});

// Create a food //
app.post('/api/foods', (req,res) => {
  let newFood = req.body
  console.log(req.body)
    db.Food.create(newFood, (err, newFood) => {
      if (err) { return console.log('ERROR', err); }
      console.log('created', newFood);
      res.json(newFood);
    });
});

// update Food
app.put('/api/foods/:id', (req, res) => {
  let foodId = req.params.id;
  let updateFood = req.body;

  db.Food.findOneAndUpdate(
      { _id: foodId }, // search condition
      updateFood, // new content you want to update
      {new:true}, // you want to receive the new object
      (err, updatedFood) => { // callback
      if(err) { return console.log(err) }
      res.json(updatedFood);
  });
});

// delete food //
app.delete('/api/foods/:id', (req, res) => {
  let foodId = req.params.id;
  db.Food.deleteOne(
      { _id: foodId },
      (err, deletedFood) => {
          if(err) { return console.log(err) }
          res.json(deletedFood);
  });
});

// Index ingredients //
app.get('/api/ingredients/', (req, res) => {
    db.Ingredient.find({ })
      .exec( (err, ingreds) => {
        if (err) {
          res.status(500).send(err);
        }
        console.log('found and populated all foods: ', ingreds);
        res.json(ingreds);
      });
  });

// Get One Ingredient //
app.get('/api/ingredients/:id', (req, res) => {
    let ingredientId = req.params.id;
    db.Ingredient.findOne({ _id: ingredientId }, (err, foundIngredient) => {
        if(err) { return console.log(err) }
        res.json(foundIngredient);
    });
  });
// Create Ingredient //
app.post('/api/ingredients', (req,res) => {
    let newIngredient = req.body
      db.Ingredient.create(newIngredient, (err, newIngredient) => {
        if (err) { return console.log('ERROR', err); }
        console.log('created', newIngredient);
        res.json(newIngredient);
      });
  });

// update Ingredient
app.put('/api/ingredients/:id', (req, res) => {
  let ingredientId = req.params.id;
  let updateIngredient = req.body;

  db.Ingredient.findOneAndUpdate(
      { _id: ingredientId }, // search condition
      updateIngredient, // new content you want to update
      {new:true}, // you want to receive the new object
      (err, updateIngredient) => { // callback
      if(err) { return console.log(err) }
      res.json(updateIngredient);
  });
});

// delete ingredient //
app.delete('/api/ingredients/:id', (req, res) => {
  let ingredientId = req.params.id;
  db.Ingredient.deleteOne(
      { _id: ingredientId },
      (err, deletedIngredient) => {
          if(err) { return console.log(err) }
          res.json(deletedIngredient);
  });
});

//Run server and run on port 3000
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});