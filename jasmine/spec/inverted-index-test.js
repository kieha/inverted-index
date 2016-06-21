describe("Inverted Index Tests", function () {
  var index = new Index();

  // perform this before the start of each test
  beforeEach(function (done) {
    index.readFile('/books.json').then(function (data) {
      index.results = data;
      index.getIndex();
      done();
    });
  });

  describe("Read book data", function () {
    it("Checks to assert that book.json is not empty", function () {
      expect(typeof index.results).toBe('string');
      expect(index.results.length).not.toEqual(0);
    });

    it("should check if input file is a valid json object", function () {
      expect(index.fileContents).not.toBeUndefined();
    });

    it("should check if the input file contains an array of objects", function () {
      expect(Array.isArray(index.fileContents)).toBe(true);
      expect(index.fileContents[0] instanceof Object).toBe(true);
      expect(index.fileContents[1] instanceof Object).toBe(true);
    });
  });

  describe("Populate Index", function () {
    it("checks if getIndex method returns an object", function () {
      expect(typeof index.getIndex()).toBe('object');
    });

    it("checks if the index created is accurate", function () {
      expect(index.getIndex().alice).toEqual([0]);
      expect(index.getIndex().ring).toEqual([1]);
      expect(index.getIndex().njerrywerry).toEqual(undefined);
    });
  });

  describe("Search Index", function () {
    it("checks if searchIndex method returns an array", function () {
      expect(Array.isArray(index.searchIndex('alice'))).toBe(true);
    });

    it("checks if the results of the search are correct", function () {
      expect(index.searchIndex('alice')).toContain(0);
      expect(index.searchIndex('alliance')).toContain(1);
      expect(index.searchIndex('njeri')).toEqual([-1]);
    });

    it("checks if searchIndex caters for multiple arguments", function () {
      // words that are in the index result in either 0 or 1
      expect(index.searchIndex('alice', 'wonderland')).toEqual([0, 0]);
      expect(index.searchIndex('alice', 'alliance')).toEqual([0, 1]);
      expect(index.searchIndex('alice', 'alliance', 'wonderland')).toEqual([0, 1, 0]);

      // words not in the index result in -1
      expect(index.searchIndex('njeri', 'mother')).not.toContain(1);
      expect(index.searchIndex('njeri', 'mother')).toEqual([-1, -1]);

      // stop words are ignored
      expect(index.searchIndex('alice', 'in', 'wonderland')).toEqual([0, 0]);
      expect(index.searchIndex('The', 'Lord', 'of', 'the', 'Rings')).toEqual([1, 1]);
    });

    it("checks if searchIndex caters for an array as an argument", function () {
      expect(index.searchIndex(['alice', 'wonderland'])).toEqual([0, 0]);
      expect(index.searchIndex(['lord', 'alliance'])).toEqual([1, 1]);
      expect(index.searchIndex(['njeri', 'kieha'])).toContain(-1);
    });

    it("caters for case sensitivity", function () {
      expect(index.searchIndex('Alice')).toContain(0);
      expect(index.searchIndex('Alice')).toEqual([0]);
      expect(index.searchIndex(['Alice', 'Alliance'])).toContain(1);
      expect(index.searchIndex(['Alice', 'Alliance'])).toEqual([0, 1]);
    });
  });
});
