// Index object
function Index() {
  this.fileContents = undefined;
  this.invertedIndex = {};
  // stop words to ignore on index creation
  this.stopWords = ["a", "an", "and", "as", "at", "but", "by", "each", "every", "for",
    "from", "her", "his", "in", "into", "its", "like", "my", "no", "nor",
    "of", "off", "on", "onto", "or", "our", "out", "outside", "over", "past",
    "since", "so", "some", "than", "that", "the", "their", "this", "to", "up", "with"
  ];

  this.readFile = function (filepath) {
    var self = this;
    return fetch(filepath)
      .then(function (response) {
        return response.text();
      }).then(function (response) {
        try {
          self.fileContents = JSON.parse(response);
        } catch (e) {
          console.log(e);
        }
        return response;
      }).catch(function (err) {
        console.log('parsing failed', err);
        throw err;
      });
  };

  this.getIndex = function () {
    var self = this;

    this.fileContents.forEach(function (element, index) {
      for (var value in element) {
        var strFileContents = element[value].toLowerCase()
          .replace(/\W/gi, " ").replace(/\s{2,}/g, " ")
          .trim().split(" ");
        strFileContents.forEach(function (word) {
          // search for and exclude stop words from index creation
          if (self.stopWords.indexOf(word) === -1) {
            if (self.invertedIndex[word]) {
              var currentValue = self.invertedIndex[word];
              if (currentValue.indexOf(index) === -1) {
                currentValue.push(index);
              }
            } else {
              self.invertedIndex[word] = [index];
            }
          }
        });
      }
    });
    return this.invertedIndex;
  };

  this.searchIndex = function (searchTerms) {
    var self = this;
    var terms = [];
    var searchResults = [];

    // convert all format of input into an array
    if (!Array.isArray(searchTerms)) {
      for (var key in arguments) {
        terms.push(arguments[key]);
      }
    } else {
      terms = searchTerms;
    }

    terms.forEach(function (term) {
      term = term.toLowerCase();
      if (self.stopWords.indexOf(term) === -1) {
        if (term in self.invertedIndex === true) {
          if (self.invertedIndex[term].length === 1) {
            searchResults.push(self.invertedIndex[term][0]);
          } else {
            searchResults.push(self.invertedIndex[term]);
          }
        } else {
          searchResults.push(-1);
        }
      }
    });
    return searchResults;
  };
}
