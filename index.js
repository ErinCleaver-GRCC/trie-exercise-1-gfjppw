
/* Class representing a Trie data structure */
class Trie {
  /**
   * Creates a Trie
   * @return {Object} Trie
   */
  constructor() {
    this.end = false;
    this.prefixes = 0;
    this.children = {};
  }

  /**
   * Insert a string into the Trie
   * @param  {String} str String to add
   * @param  {Number} pos Optional position in Trie
   * @return {}
   */
  insert(str, pos = 0) {
    if(str.length === pos) {
      this.end = true;
      return;
    }
    let key = [str[pos]];
    if(!this.children[key]) {
      this.children[key] = new Trie();
    }
    this.children[key].insert(str, pos + 1);

  }



  
  /**
   * Return all words in Trie with a given prefix
   * @param  {String} str Prefix to search for
   * @return {Array} Array of strings that match for prefix
   */
  getAllWords(str = "") {
    let wordList = [];


    // first checks to see if thier are values in this, and if not it will return an empty array
    if(this === undefined) {
      return [];
      // next checks to see if end is equal to true which makes it a word.
    } else if(this.end) {
      wordList.push(str);
    } else {
      // then gets the next letter in the for loop, it did not work with the for each loop though
      for(let letter in this.children){
        // assigns the letter to the currentChild
        let currentChild = this.children[letter];

        // then adds it to the loop
        wordList = wordList.concat(currentChild.getAllWords(str + letter));
      }
    }
    return wordList;
  }

  /**
   * finds and returs a word
   * @param  {String} word Prefix to search for
   * @return {Array} Array of strings that match for prefix
  */
   find(str,suggestions = []) {
    // get letters from word 
    if(this.end){
      return;
    }

    this.getAllWords().forEach(word => {
      if(word.includes(str)) {
        suggestions.push(word);
      }
    })
    
    return suggestions;
  }

     /**
   * Return wprds that match the auto complete 
   * @param  {String} str Prefix to search for
   * @return {Array} Array of strings that match for prefix
   */

  autoComplete(str = "") {
    let completed = this.find(str);
    return completed;
  }
}
// tests
const trie = new Trie();
trie.insert("cow");
trie.insert("cat");
trie.insert("dog");
trie.insert("dad");
/*console.log("\n\n")
console.log(JSON.stringify(trie))
console.log("\n\n")
console.log(JSON.stringify(trie.getAllWords()));
console.log("\n\n")
*/
console.log(trie.autoComplete("cat"));
