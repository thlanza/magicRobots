Deck = require("./deckModel");
// Handle index actions
exports.index = function(req, res) {
  Deck.get(function(err, decks) {
    if (err) {
      res.json({
        status: "erro",
        message: err
      });
    }
    res.json({
      status: "sucesso",
      message: "Decks carregados com sucesso!",
      data: decks
    });
  });
};
// Handle create contact actions
exports.new = function(req, res) {
  var deck = new Deck();
  deck.piloto = req.body.piloto ? req.body.piloto : deck.piloto;
  deck.arquetipo = req.body.arquetipo;
  deck.fonte = req.body.fonte;
  deck.torneio = req.body.torneio;
  deck.decklist = req.body.decklist;

  deck.save(function(err) {
    res.json({
      message: "Novo deck criado!",
      data: deck
    });
  });
};
// Handle view contact info
exports.view = function(req, res) {
  Deck.findById(req.params._id, function(err, deck) {
    if (err) res.send(err);
    res.json({
      message: "Detalhes do deck carregando...",
      data: deck
    });
  });
};
// Handle update contact info
exports.update = function(req, res) {
  Deck.findById(req.params._id, function(err, contact) {
    if (err) res.send(err);

    deck.piloto = req.body.piloto ? req.body.piloto : deck.piloto;
    deck.arquetipo = req.body.arquetipo;
    deck.fonte = req.body.fonte;
    deck.torneio = req.body.torneio;
    deck.decklist = req.body.decklist;

    // save the contact and check for errors
    deck.save(function(err) {
      if (err) res.json(err);
      res.json({
        message: "Contato atualizado",
        data: deck
      });
    });
  });
};
// Handle delete contact
exports.delete = function(req, res) {
  Deck.remove(
    {
      _id: req.params._id
    },
    function(err, deck) {
      if (err) res.send(err);
      res.json({
        status: "sucesso",
        message: "Deck deletado"
      });
    }
  );
};
