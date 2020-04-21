const deepEquals = (a, b) => {
  if (a === b) {
    return true;
  } else if (typeof a != typeof b) {
    return false;
  } else if (typeof a == "object") {
    for (let key of Object.keys(a)) {
      if (key in b) {
        if (!deepEquals(a[key], b[key])) {
          return false;
        }
      } else {
        return false;
      }
    }
    for (let key of Object.keys(b)) {
      if (key in a) {
      } else {
        return false;
      }
    }
    return true;
  } else {
    return false;
  }
};

console.log(deepEquals(1, 1));
console.log(deepEquals(null, 1));
console.log(deepEquals(1, "1"));
console.log(deepEquals(1, "one"));
console.log(deepEquals("one", "one"));
console.log(deepEquals({ a: 1, b: 2 }, { a: 1, b: 2 }));
console.log(deepEquals({ a: 1, b: 3 }, { a: 1, b: 2 }));
console.log(deepEquals({ a: 1 }, { a: 1, b: 2 }));
console.log(deepEquals({ a: 1, b: 2 }, { a: 1, b: { x: "ex", y: "why" } }));
console.log(deepEquals({ a: 1, b: { x: "ECHS", y: "why" } }, { a: 1, b: { x: "ex", y: "why" } }));
console.log(deepEquals({ a: 1, b: { x: "ex", y: "why" } }, { a: 1, b: { x: "ex", y: "why" } }));
