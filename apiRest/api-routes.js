// Filename: api-routes.js
// Initialize express router
// Initialize express router
let router = require("express").Router();
const { check, validationResult } = require("express-validator");
// Set default API response
// Import contact controller
router.get("/", function(req, res) {
  res.json({
    status: "API Its Working",
    message: "Welcome to RESTHub crafted with love!"
  });
});

var deckController = require("./deckController");
// Contact routes
router
  .route("/decks")
  .get(deckController.index)
  .post(deckController.new);
router
  .route("/decks/:_id")
  .get(deckController.view)
  .patch(deckController.update)
  .put(deckController.update)
  .delete(deckController.delete);
// Export API routes
module.exports = router;
