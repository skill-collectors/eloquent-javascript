const minimum = (a, b) => {
  if (a < b) {
    return a;
  } else {
    return b;
  }
};

console.log("1 and 2 is " + minimum(1, 2));
console.log("100 and 24 is " + minimum(100, 24));
console.log("34 and 34 is " + minimum(34, 34));
