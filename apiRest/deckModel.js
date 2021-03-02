var mongoose = require("mongoose");
// Setup schema
var deckSchema = mongoose.Schema({
  piloto: {
    type: Array,
    required: true
  },
  arquetipo: String,
  fonte: String,
  torneio: String,
  decklist: {
    type: Array,
    required: true
  },
  data_criado: {
    type: Date,
    default: Date.now
  }
});
// Export Deck model
var Deck = (module.exports = mongoose.model("deckSchema", deckSchema));
module.exports.get = function(callback, limit) {
  Deck.find(callback).limit(limit);
};
