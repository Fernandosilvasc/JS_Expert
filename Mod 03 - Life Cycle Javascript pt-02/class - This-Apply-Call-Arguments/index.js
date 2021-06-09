"use strict";

const {
  watch,
  promises: { readFile },
} = require("fs");

class File {
  watch(event, filename) {
    console.log("this", this);
    console.log("arguments", Array.prototype.slice.call(arguments));
    this.showContent(filename);
  }

  async showContent(filename) {
    console.log((await readFile(filename)).toString());
  }
}

const file = new File();
// This way, it ignores the "this" from the File class and inherits this from the "watch" function.
// =>   watch(__filename, file.watch());

// This one of those alternatives that we have to avoid inherit the "this" from the function.
// =>  watch(__filename, (event, filename) => file.watch(event, filename));

// We can leave explicit which "this" is the right context that the function has to follow using "bind" for that.
// Bind returns a function with "this" that we set up.
// =>  watch(__filename, file.watch.bind(file));

// Using the methods "call" and "apply", the only difference between them is that one we pass using an array and the other we pass using a list of arguments.

file.watch.call(
  { showContent: () => console.log("call: hi there") },
  null,
  __filename
);
file.watch.apply({ showContent: () => console.log("apply: hi there") }, [
  null,
  __filename,
]);
