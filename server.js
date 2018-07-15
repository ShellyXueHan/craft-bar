var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var BEERS_COLLECTION = "beers";

var app = express();
app.use(bodyParser.json());

// Link to Angular build artifacts:
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// DB object:
var db;

// DB connection:
mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, client) {
  // mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test", function (err, client) {
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

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

// APIs:
app.get("/api/beers", function(req, res) {
  db.collection(BEERS_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get beers.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/api/beers", function(req, res) {
  var newBeer = req.body;
  newBeer.createDate = new Date();

  if (!req.body.name) {
    handleError(res, "Invalid user input", "Must provide a name.", 400);
  } else {
    db.collection(BEERS_COLLECTION).insertOne(newBeer, function(err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to create new beer.");
      } else {
        res.status(201).json(doc.ops[0]);
      }
    });
  }
});

app.get("/api/beers/:id", function(req, res) {
  db.collection(BEERS_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get beer");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.put("/api/beers/:id", function(req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(BEERS_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, {$set: updateDoc}, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update beer");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

app.delete("/api/beers/:id", function(req, res) {
  db.collection(BEERS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete beer");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});
