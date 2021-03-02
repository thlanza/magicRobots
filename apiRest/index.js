let express = require("express");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let apiRoutes = require("./api-routes");
let cors = require("cors");

let app = express();

var port = process.env.PORT || 8070;

app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/decksdatabase", {
  useNewUrlParser: true
});
var db = mongoose.connection;

// Added check for DB connection
if (!db) console.log("Error connecting db");
else console.log("Db connected successfully");

app.get("/", (req, res) => res.send("Hello World with Express"));

// Use Api routes in the App
app.use("/api", apiRoutes);
// Launch app to listen to specified port
app.listen(port, function() {
  console.log("Rodando PauperBH na porta " + port);
});
