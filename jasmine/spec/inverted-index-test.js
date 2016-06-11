// asserting book.json is not empty
var obj = new Index();
obj.createIndex('../../books.json');
var contents = obj.fileContents;

describe("Read book data", function () {
  it("Checks to assert that book.json is not empty", function () {
    expect(contents.length).not.toBe(0);
  });
});
