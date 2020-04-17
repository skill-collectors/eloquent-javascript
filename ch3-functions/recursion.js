const isEven = (num) => {
  if (num === 0) {
    return "Even";
  } else if (num === 1) {
    return "Odd";
  } else if (num < 0) {
    return isEven(num + 2);
  } else {
    return isEven(num - 2);
  }
};

console.log("50 is " + isEven(50));
console.log("75 is " + isEven(75));
console.log("-1 is " + isEven(-1));
