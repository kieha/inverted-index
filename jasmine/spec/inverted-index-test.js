describe("Inverted Index Tests", function () {
  var index = new Index();

// perform this before the start of each test
  beforeEach(function(done) {
    index.readFile('/books.json').then(function(data) {
      index.results = data;
      index.getIndex().then(function(stuff) {
        index.index_ = stuff;
        done();
      });
    });
  });

  describe("Read book data", function() {
    it("Checks to assert that book.json is not empty", function() {
      expect(typeof index.results).toBe('string');
      expect(index.results.length).not.toEqual(0);
    });

    it("should check if input file is a valid json object", function() {
      expect(index.fileContents).not.toBeUndefined();
    });

    // it("should check if the input file contains an array of objects", function() {
    //   expect(Array.isArray(index.index_)).toBe(true);
    //   expect(index.index_[0] instanceof Object).toBe(true);
    //   expect(index.index_[1] instanceof Object).toBe(true);
    // });
  });

  describe("Populate Index", function () {
    it("checks if getIndex method returns an object", function () {
      expect(typeof index.index_).toBe('object');
    });
  });
});
