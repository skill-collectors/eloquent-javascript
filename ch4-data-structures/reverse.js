const reverseArray = array => {
  const rev = [];
  for (let elem of array) {
    rev.unshift(elem);
  }
  return rev;
};

const reverseArrayInPlace = array => {
  for (let frontI = 0; frontI < array.length / 2; frontI++) {
    const backI = array.length - frontI - 1;
    const front = array[frontI];
    const back = array[backI];
    array[frontI] = back;
    array[backI] = front;
  }
  return array;
};

let myArray = [1, 2, 3, 4, 5, 6];
console.log(reverseArray(myArray));
console.log(myArray);

console.log(reverseArrayInPlace(myArray));
console.log(myArray);

console.log(reverseArrayInPlace([]));
console.log(reverseArrayInPlace([1]));
console.log(reverseArrayInPlace([1, 2]));
console.log(reverseArrayInPlace([1, 2, 3]));
