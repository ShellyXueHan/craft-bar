var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");

var app = express();
app.use(bodyParser.json());

// DB object:
var db;

// DB connection:
mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test", function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Keep BD object:
  db = client.db();
  console.log("Database Up");

  // Init app:
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("Running on port", port);
  });
});