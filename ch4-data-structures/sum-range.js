const range = (start, end, step = 1) => {
  if (start === end) {
    return [start];
  } else if (start < end && step > 0) {
    const array = [];
    for (let n = start; n <= end; n += step) {
      array.push(n);
    }
    return array;
  } else if (start > end && step < 0) {
    const array = [];
    for (let n = start; n >= end; n += step) {
      array.push(n);
    }
    return array;
  } else {
    return undefined;
  }
};

const sum = array => {
  let result = 0;
  for (let num of array) {
    result += num;
  }
  return result;
};

console.log(range(1, 10));
console.log(range(1, 10, 2));
console.log(range(5, 2, -3));
console.log(range(1, 10, -3));
console.log(range(1, 1, -3));
console.log(range(10, 1, 0));

console.log(sum(range(1, 10)));
