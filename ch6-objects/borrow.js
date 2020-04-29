const regular = {
  stuff: "things"
};

console.log(regular.hasOwnProperty);
console.log(regular.hasOwnProperty("stuff"));
console.log(regular.hasOwnProperty("hasOwnProperty"));

const tricky = {
  stuff: "things",
  hasOwnProperty: "🤯 mind blown"
}

console.log(tricky.hasOwnProperty);
console.log(Object.getPrototypeOf(tricky).hasOwnProperty("stuff"));
console.log(Object.getPrototypeOf(tricky).hasOwnProperty("hasOwnProperty"));
