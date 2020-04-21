const prepend = (elem, list) => {
  return {
    value: elem,
    rest: list
  };
};

const arrayToList = array => {
  let list = null;
  for (let i = array.length - 1; i >= 0; i--) {
    list = prepend(array[i], list);
  }
  return list;
};

const listToArray = list => {
  const array = [];
  while (list) {
    array.push(list.value);
    list = list.rest;
  }
  return array;
}

const nth = (list, index) => {
  if (index < 0) {
    return undefined;
  } else if (index === 0) {
    return list.value;
  } else if (list.rest) {
    return nth(list.rest, index - 1);
  } else {
    return undefined;
  }
}

const myList = arrayToList([1, 2, 3]);
console.log(myList);

console.log(prepend(9, myList));

console.log(listToArray(myList));

console.log(nth(arrayToList([1, 2, 3]), 0));
console.log(nth(arrayToList([1, 2, 3]), 1));
console.log(nth(arrayToList([1, 2, 3]), 2));
console.log(nth(arrayToList([1, 2, 3]), -1));
console.log(nth(arrayToList([1, 2, 3]), 5));

console.log(nth(arrayToList([1, null, 2]), 2))
