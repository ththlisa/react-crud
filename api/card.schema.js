const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define collection and schema for Card
let Card = new Schema(
  {
    Card_name: {
      type: String
    },
    Card_content: {
      type: String
    },
    Card_tag: {
      type: String
    }
  },
  {
    collection: "Card"
  }
);

module.exports = mongoose.model("Card", Card);
