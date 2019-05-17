const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define collection and schema for Card
let Card = new Schema(
  {
    card_name: {
      type: String
    },
    card_content: {
      type: String
    },
    card_tag: {
      type: String
    }
  },
  {
    collection: "Card"
  }
);

module.exports = mongoose.model("Card", Card);
