/* 9.1 Tracking the Scalpel */
async function locateScalpel(nest) {
  let cur = nest.name
  let next = await anyStorage(nest, cur, 'scalpel');
  while(true) {
    next = await anyStorage(nest, cur, 'scalpel');
    if(next === cur) break;
    cur = next;
  }
  return cur;
}

function locateScalpel2(nest) {
  // Your code here.
}

locateScalpel(bigOak).then(console.log);
// → Butcher Shop
