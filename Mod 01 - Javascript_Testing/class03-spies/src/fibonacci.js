class Fibonacci {
  *execute(input, current = 0, next = 1) {
    console.count("execute!");
    if (input === 0) {
      return 0;
    }
    // return the value
    yield current;
    // to delegate the function but it does not return any value.
    yield* this.execute(input - 1, next, current + next);
  }
}

module.exports = Fibonacci;
