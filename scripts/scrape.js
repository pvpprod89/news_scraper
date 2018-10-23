var request = require("request");
var cheerio = require("cheerio");

var scrape = function(cb) {
  request("https://globalnews.ca/canada/", function(err, res, body) {
    var $ = cheerio.load(body);
    var articles = [];
    $("article").each(function(i, element) {
      var head = $(this)
        .children(".story-h")
        .text()
        .trim();

      var link = $(this)
        .children(".story-h")
        .children("a")
        .attr("href");

      var dataToAdd = {
        headline: head,
        summary: link
      };
      articles.push(dataToAdd);
    });
    cb(articles);
  });
};

module.exports = scrape;
