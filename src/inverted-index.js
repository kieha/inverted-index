// Index object
function Index() {
  this.fileContents = undefined;
  this.invertedIndex = {};

  this.readFile = function(filepath) {
    var self = this;
    return fetch(filepath)
      .then(function(response) {
        return response.text();
      }).then(function(response) {
        try {
          self.fileContents = JSON.parse(response);
        } catch (e) {
          console.log(e);
        }
        return response;
      }).catch(function(err) {
        console.log('parsing failed', err);
        throw err;
      });
  };

  this.getIndex = function() {
    var self = this;
    // stop words to ignore on index creation
    var stopWords = ["a", "an", "and", "as", "at", "but", "by", "each", "every", "for",
        "from", "her", "his", "in", "into", "its", "like", "my", "no", "nor",
        "of", "off", "on", "onto", "or", "our", "out", "outside", "over", "past",
        "since", "so", "some", "than", "that", "the", "their", "this", "to", "up", "with"
      ];

    this.fileContents.forEach(function(element, index) {
    	for(var value in element) {
        var strFileContents = element[value].toLowerCase().replace
        (/[.,\/#!$%\^&\*;:{}=\-_`~()]+/gi, " ").replace(/\s{2,}/g, " ").trim().split(" ");
    		strFileContents.forEach(function(word) {
          // search for and exclude stop words from index creation
          if (stopWords.indexOf(word) === -1) {
            if (self.invertedIndex[word]) {
              var currentValue = self.invertedIndex[word];
              if(currentValue.indexOf(index) === -1) {
                currentValue.push(index);
              }
            }
            else { self.invertedIndex[word] = [index]; }
          }
    		});
    	}
    });
    return this.invertedIndex;
  };

  this.searchIndex = function(searchTerms) {
    searchResults = [];
    for (var i = 0; i < arguments.length; i++) {
      if(arguments[i] in this.invertedIndex === true) {
        console.log(arguments[i]);
        if(this.invertedIndex[arguments[i]].length === 1) {
          searchResults.push(this.invertedIndex[arguments[i]][0]);
        } else {
          searchResults.push(this.invertedIndex[arguments[i]]);
        }
      } else {
        searchResults.push(-1);
      }
    }
    console.log(searchResults);
    return searchResults;
  };
}
