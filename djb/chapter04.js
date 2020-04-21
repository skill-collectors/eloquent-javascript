/* 4.1 The sum of a range */
function range(start, end, step = 1) {
  let i = start;
  let arr = [];
  while(i >= Math.min(start,end) && i <= Math.max(start,end)) {
    arr.push(i);
    i += step;
  }
  return arr;
}

function sum(arr) {
  let sum = 0;
  for(i of arr) {
    sum += i;
  }
  return sum;
}

console.log(range(1, 10));
// → [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(range(5, 2, -1));
// → [5, 4, 3, 2]
console.log(sum(range(1, 10)));
// → 55

/* 4.2 Reversing an array */
function reverseArray(arr) {
  let result = [];
  for(let i = 0; i < arr.length; i++){
    result.unshift(arr[i]);
  }
  return result;
}

function reverseArrayInPlace(arr) {
  for(let i = 0; i < arr.length; i++){
    const val = arr.pop();
    arr.splice(i, 0, val);
  }
}

console.log(reverseArray(["A", "B", "C"]));
// → ["C", "B", "A"];
let arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);
// → [5, 4, 3, 2, 1]
