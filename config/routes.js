var scrape = require("../scripts/scrape");
var headlinesController = require("../controllers/headlines");
var notesController = require("../controllers/notes");

module.exports = function(router) {
  //homepage
  router.get("/", function(req, res) {
    res.render("home");
  });

  //get the saved handlebars page
  router.get("/saved", function(req, res) {
    res.render("saved");
  });

  //get all articles
  router.get("/api/fetch", function(req, res) {
    headlinesController.fetch(function(err, docs) {
      if (!docs || docs.insertedCount === 0) {
        res.json({ message: "No new articles. Checkback Later!" });
      } else {
        res.json({
          message: "Added " + docs.insertedCount + " new articles!"
        });
      }
    });
  });

  //get all headlines
  router.get("/api/headlines", function(req, res) {
    var query = {};
    if (req.query.saved) {
      query = req.query;
    }
    headlinesController.get(query, function(data) {
      res.json(data);
      console.log(data);
    });
  });

  //delete article
  router.delete("/api/headlines/:id", function(req, res) {
    var query = {};
    query._id = req.params.id;
    headlinesController.delete(query, function(err, data) {
      res.json(data);
    });
  });

  //update headlines
  router.patch("/api/headlines", function(req, res) {
    headlinesController.update(req, body, function(err, data) {
      res.json(data);
    });
  });

  //get all notes realted to articles
  router.get("/api/notes/:headline_id?", function(req, res) {
    var query = {};
    if (req.params.headline_id) {
      query._id = req.params.headline_id;
    }
    notesController.get(query, function(err, data) {
      res.json(data);
    });
  });

  //delete notes
  router.delete("/api/notes/:id", function(req, res) {
    var query = {};
    query._id = req.params.id;
    notesController.delete(query, function(err, data) {
      res.json(data);
    });
  });

  //post new notes to articles
  router.post("/api/notes", function(req, res) {
    notesController.save(req.body, function(data) {
      res.json(data);
    });
  });
};
