/* 5.1 Flattening */
let arrays = [[1, 2, 3], [4, 5], [6]];
console.log(arrays.reduce((acc, cur) => {
  if(cur instanceof Array) {
    for(x of cur) {
      acc.push(x);
    }
  } else {
    acc.push(cur);
  }
  return acc;
}));
// → [1, 2, 3, 4, 5, 6]

/* 5.2 Your Own Loop */
function loop(value, test, update, body) {
  while(test(value)) {
    body(value);
    value = update(value);
  }
}
loop(3, n => n > 0, n => n - 1, console.log);
// → 3
// → 2
// → 1

/* 5.3 Everything */
function every(array, test) {
  for(let i = 0; i < array.length; i++) {
    if(!test(array[i])) {
      return false;
    }
  }
  return true;
}

// Had to look at the solution for 'every' using 'some'.
// which is return !array.some(x => !predicate(x));

console.log(every([1, 3, 5], n => n < 10));
// → true
console.log(every([2, 4, 16], n => n < 10));
// → false
console.log(every([], n => n < 10));
// → true

/* 5.4 Dominant writing direction */
function dominantDirection(text) {
  let nLtr = 0;
  let nRtl = 0;
  for(c of text) {
    if(c) {
      const codePoint = c.codePointAt(0);
      const script = characterScript(codePoint)
      if(script) {
        const direction = script.direction;
        if(direction) {
          if(direction === 'ltr') {
            nLtr++;
          }
          if(direction === 'rtl') {
            nRtl++;
          }
        }
      }
    }
  }
  return nLtr > nRtl ? 'ltr' : 'rtl';
}

console.log(dominantDirection("Hello!"));
// → ltr
console.log(dominantDirection("Hey, مساء الخير"));
// → rtl
