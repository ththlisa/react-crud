// card.route.js

const express = require("express");
const cardRoutes = express.Router();

// Require card model in our routes module
let card = require("./card.schema");

// Defined store route
cardRoutes.route("/add").post(function(req, res) {
  let card = new Card(req.body);
  card
    .save()
    .then(card => {
      res.status(200).json({ card: "card in added successfully" });
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
cardRoutes.route("/").get(function(req, res) {
  card.find(function(err, cards) {
    if (err) {
      console.log(err);
    } else {
      res.json(cards);
    }
  });
});

// Defined edit route
cardRoutes.route("/edit/:id").get(function(req, res) {
  let id = req.params.id;
  card.findById(id, function(err, card) {
    res.json(card);
  });
});

//  Defined update route
cardRoutes.route("/update/:id").post(function(req, res) {
  card.findById(req.params.id, function(err, card) {
    if (!card) res.status(404).send("data is not found");
    else {
      card.card_name = req.body.card_name;
      card.card_content = req.body.card_content;
      card.card_tag = req.body.card_tag;

      card
        .save()
        .then(card => {
          res.json("Update complete");
        })
        .catch(err => {
          res.status(400).send("unable to update the database");
        });
    }
  });
});

// Defined delete | remove | destroy route
cardRoutes.route("/delete/:id").get(function(req, res) {
  card.findByIdAndRemove({ _id: req.params.id }, function(err, card) {
    if (err) res.json(err);
    else res.json("Successfully removed");
  });
});

module.exports = cardRoutes;
