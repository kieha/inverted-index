// Index object
function Index() {
  this.fileContents = undefined;
  this.invertedIndex = {};

  // stop words to ignore on index creation
  this.stopWords = ['a', 'an', 'and', 'as', 'at', 'but', 'by', 'each', 'every',
    'for', 'from', 'her', 'his', 'in', 'into', 'its', 'like', 'my', 'no', 'nor',
    'of', 'off', 'on', 'onto', 'or', 'our', 'out', 'outside', 'over', 'past',
    'since', 'so', 'some', 'than', 'that', 'the', 'their', 'this', 'to', 'up',
    'with'
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

    this.fileContents.forEach(function (book, index) {
      for (var key in book) {
        var wordArray = book[key].toLowerCase()
          .replace(/\W+/g, ' ').trim().split(' ');
        wordArray.forEach(function (word) {
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

      // ignore stop words from being included in search result
      if (self.stopWords.indexOf(term) === -1) {
        if (term in self.invertedIndex === true) {
          if (self.invertedIndex[term].length === 1) {
            searchResults.push([term, self.invertedIndex[term][0]]);
          } else {
            searchResults.push([term, self.invertedIndex[term]]);
          }
        } else {
          searchResults.push([term, -1]);
        }
      }
    });
    return searchResults;
  };
}
