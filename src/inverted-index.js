// Index object
function Index() {
  this.fileContents = undefined;
  // this.index_ = {};
  var self = this;

  this.createIndex = function(filepath) {
    return fetch(filepath)
      .then(function(response) {
        return response.text();
      }).then(function(response) {
        try {
          self.fileContents = JSON.parse(response);
        } catch (e) {
          console.log(e);
        }
        return self.fileContents;
      }).catch(function(err) {
        console.log('parsing failed', err);
        throw err;
      });
  };
}
