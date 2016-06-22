# inverted-index

## Checkpoint Explanation
For further explanation of what an inverted index is, visit the following link: [https://www.elastic.co/guide/en/elasticsearch/guide/current/inverted-index.html](https://www.elastic.co/guide/en/elasticsearch/guide/current/inverted-index.html)

The following are the methods involved in this inverted index:
* **readFile(filepath)**

This method takes an argument of filepath *(which is a string representation of the path of the JSON file to be read)*, reads the data in the file, and returns the contents of the file.

* **getIndex()**

This method creates the inverted index from the contents of the JSON file, and returns the correct inverted index.

* **searchIndex(searchTerms)**

This method takes in either a word(s) or an array of words as a search term, and returns an Array of numbers, each number representing the index (position) of an object in the JSON file. If the search term(s) are not present in the inverted index, the number returned is -1. 



## Running The Tests
Since Chrome cannot load a JSON file while reading a HTML file loaded directly to the browser as a local file, the HTML file has to be loaded from a web server. So from your terminal, type the following commmand to start up the python server:

``` 
$ python -m SimpleHTTPServer 3000
```
Then visit [http://localhost:3000/jasmine/SpecRunner.html](http://localhost:3000/jasmine/SpecRunner.html) on your browser, and run the rests.
