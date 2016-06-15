describe("Inverted Index Tests", function () {
  var index = new Index();

// perform this before the start of each test
  beforeEach(function(done) {
    index.createIndex('/books.json').then(function(data) {
      index.results = data;
      done();
    });
  });

  describe("Read book data", function() {
    it("Checks to assert that book.json is not empty", function () {
      expect(typeof index.results).toBe('object');
      expect(index.results.length).not.toEqual(0);
    });

    it("should check if input file is a valid json object", function () {
      expect(index.fileContents).not.toBeUndefined();
    });
  });
});
