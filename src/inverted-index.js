// Index object
function Index() {
  this.fileContents = undefined;
  this.books = [];
  this.invertedIndex = {};
  var self = this;

  this.readFile = function(filepath) {
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
    return this.readFile('../books.json').then(function() {
      self.fileContents.forEach(function(element, index) {
      	for(var value in element) {
          var strFileContents = element[value].toLowerCase().replace
          (/[.,\/#!$%\^&\*;:{}=\-_`~()]+/gi, " ").replace(/\s{2,}/g, " ").trim().split(" ");
      		strFileContents.forEach(function(word) {
      			if (self.invertedIndex[word]) {
              var currentValue = self.invertedIndex[word];
              if(currentValue.indexOf(index) === -1) {
                currentValue.push(index);
              }
            }
            else {
      				self.invertedIndex[word] = [index];
      			}
      		});
      	}
      });
      console.log(self.invertedIndex);
      return self.invertedIndex;
    });
  };
}
