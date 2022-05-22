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

/* 4.3 a list */
function arrayToList(arr) {
  const head = { value: arr[0], rest: null }
  let next = head;
  for(let i = 1; i < arr.length; i++) {
    next.rest = { value: arr[i], rest: null };
    next = next.rest;
  }
  return head;
}

function listToArray(list) {
  const arr = [list.value];
  let rest = list.rest;
  while(rest != null) {
    arr.push(rest.value);
    rest = rest.rest;
  }
  return arr;
}

function prepend(value, rest) {
  return { value, rest };
}

function nth(list, index) {
  let node = list;
  for(let i = 0; i < index; i++) {
    if(!node.rest) {
      return undefined;
    }
    node = node.rest;
  }
  return node.value;
}

console.log(arrayToList([10, 20]));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(listToArray(arrayToList([10, 20, 30])));
// → [10, 20, 30]
console.log(prepend(10, prepend(20, null)));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(nth(arrayToList([10, 20, 30]), 1));
// → 20

/* 4.4 deep comparison */
// This could be cleaned up a lot
function deepEqual(a, b) {
  if(typeof a === 'object' && typeof b === 'object') {
    if((a === null && b !== null) || (a !== null && b === null)) {
       return false;
    }
    for(key of Object.keys(a)) {
      if(!deepEqual(a[key], b[key])) {
        return false;
      }
    }
    for(key of Object.keys(b)) {
      if(!deepEqual(b[key], a[key])) {
        return false;
      }
    }
  } else {
    return a === b;
  }
  return true;
}

let obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// → true
