var index = new Index();
var serverHostUrl = 'http://localhost:8080';

describe('Validate File Existance and Validity', function () {
  it('throws error for non existing files', function (done) {
    index.readFile(serverHostUrl + '/non-existent.json')
      .catch(function (err) {
        expect(err instanceof Error).toBeTruthy();
        expect(err).toEqual(jasmine.any(Error));
        done();
      });
  });

  it('throws an error for invalid json files', function (done) {
    index.readFile(serverHostUrl + '/invalid-json.json')
      .catch(function (err) {
        expect(err instanceof SyntaxError).toBeTruthy();
        done();
      });
  });
});

describe('Inverted Index Tests', function () {

  // Load json file and create index object before carrying out any test
  beforeEach(function (done) {
    index.readFile(serverHostUrl + '/books.json').then(function (data) {
      index.results = data;
      index.getIndex();
      done();
    });
  });

  describe('Read book data', function () {
    it('checks to assert that book.json is not empty', function () {
      expect(typeof index.results).toBe('string');
      expect(index.results.length).not.toEqual(0);
    });

    it('checks if input file is a valid json object', function () {
      expect(index.fileContents).not.toBeUndefined();
    });

    it('checks if the input file contains an array of objects', function () {
      expect(Array.isArray(index.fileContents)).toBe(true);
      expect(index.fileContents[0] instanceof Object).toBe(true);
      expect(index.fileContents[1] instanceof Object).toBe(true);
    });
  });

  describe('Populate Index', function () {
    it('checks if getIndex method returns an object', function () {
      expect(typeof index.getIndex()).toBe('object');
    });

    it('checks if the index created is accurate', function () {
      expect(index.getIndex().alice).toEqual([0]);
      expect(index.getIndex().ring).toEqual([1]);
      expect(index.getIndex().njerrywerry).toEqual(undefined);
    });
  });

  describe('Search Index', function () {
    it('checks if searchIndex method returns an array', function () {
      expect(Array.isArray(index.searchIndex('alice'))).toBe(true);
    });

    it('checks if the results of the search are correct', function () {
      expect(index.searchIndex('alice')).toEqual([
        ['alice', [0]]
      ]);
      expect(index.searchIndex('alliance')).toEqual([
        ['alliance', [1]]
      ]);
      expect(index.searchIndex('njeri')).toEqual([
        ['njeri', -1]
      ]);
    });

    it('checks if searchIndex caters for multiple arguments', function () {
      // words that are in the index result in either [0] or [1]
      expect(index.searchIndex('alice', 'wonderland')).toEqual([
        ['alice', [0]],
        ['wonderland', [0]]
      ]);
      expect(index.searchIndex('alice', 'alliance')).toEqual([
        ['alice', [0]],
        ['alliance', [1]]
      ]);
      expect(index.searchIndex('alice', 'alliance', 'wonderland')).toEqual([
        ['alice', [0]],
        ['alliance', [1]],
        ['wonderland', [0]]
      ]);

      // words not in the index result in -[1]
      expect(index.searchIndex('njeri', 'mother')).toEqual([
        ['njeri', -1],
        ['mother', -1]
      ]);

      // stop words are ignored
      expect(index.searchIndex('alice', 'in', 'wonderland')).toEqual([
        ['alice', [0]],
        ['wonderland', [0]]
      ]);
      expect(index.searchIndex('The', 'Lord', 'of', 'the', 'Rings')).toEqual([
        ['lord', [1]],
        ['rings', [1]]
      ]);
      expect(index.searchIndex(['The', 'Lord', 'of', 'the', 'Rings'])).toEqual([
        ['lord', [1]],
        ['rings', [1]]
      ]);
    });

    it('checks if searchIndex caters for an array as an argument', function () {
      expect(index.searchIndex(['alice', 'wonderland'])).toEqual([
        ['alice', [0]],
        ['wonderland', [0]]
      ]);
      expect(index.searchIndex(['lord', 'alliance'])).toEqual([
        ['lord', [1]],
        ['alliance', [1]]
      ]);
      expect(index.searchIndex(['njeri', 'lord', 'kieha']))
        .toContain(['njeri', -1]);
    });

    it('caters for case sensitivity', function () {
      expect(index.searchIndex('Alice')).toEqual([
        ['alice', [0]]
      ]);
      expect(index.searchIndex(['Alice', 'Alliance'])).toEqual([
        ['alice', [0]],
        ['alliance', [1]]
      ]);
    });

    it('caters for words that occur in both documents', function () {
      expect(index.searchIndex('alice', 'in', 'new', 'wonderland')).toEqual([
        ['alice', [0]],
        ['new', [0, 1]],
        ['wonderland', [0]]
      ]);
      expect(index.searchIndex('alice', 'in', 'new', 'lord')).toEqual([
        ['alice', [0]],
        ['new', [0, 1]],
        ['lord', [1]]
      ]);
    });
  });
});
