// Index object
function Index() {
  var book = [
    {
      "title": "Alice in Wonderland",
      "text": "Alice falls into a rabbit hole and enters a world full of imagination."
    },

    {
      "title": "The Lord of the Rings: The Fellowship of the Ring.",
      "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
    }
  ];

  this.fileContents = [];
  this.index_ = {};
  // this.createIndex = function(filepath) {
  //   fetch(filepath)
  //     .then(function(response) {
  //       response.json();
  //       return response.json();
  //     });
  // };

  this.getIndex = function() {
     var self = this;
     for (var i = 0; i < book.length; i++) {
       var obj = book[i];
       Object.keys(obj).map(function(key) {
         self.fileContents.push(obj[key]);
       });
       strFileContents = this.fileContents.toString().toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]+/gi, " ").replace(/\s{2,}/g, " ").trim().split(" ");
      //  console.log(i);
       for (var x = 0; x < strFileContents.length; x++) {
         this.index_[strFileContents[x]] = i;

       }
       console.log(this.index_);
     }
    //  console.log(this.index_);
    //  strFileContents = this.fileContents.toString().toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]+/gi, " ").replace(/\s{2,}/g, " ").trim().split(" ");

    //  var stopWords = ["of", "the", "a", "an", "and", "but", "to", "for"];
    //  reg = "\\b" + stopWords.toString().replace(/,/g, "\\b|\\b") + "\\b";
  };
}

var newind = new Index();
newind.getIndex();
