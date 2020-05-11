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
  const lookup = function(name) {
    return anyStorage(nest, name, 'scalpel').then(scalpel => {
      if(scalpel === name) {
        return scalpel;
      } else {
        return lookup(scalpel);
      }
    });
  }
  return lookup(nest.name);
}

locateScalpel(bigOak).then(console.log);
locateScalpel2(bigOak).then(console.log);
// → Butcher Shop

/* 9.2 Building Promis.all */
function Promise_all(promises) {
  return new Promise((resolve, reject) => {
    let nResolved = 0;
    let results = [];
    if(promises.length == 0) resolve([]);
    promises.forEach((promise, i) => {
      promise.then(result => {
        results[i] = result;
        nResolved++;
        if(nResolved == promises.length) {
          resolve(results);
        }
      }).catch(err => reject(err));
    });
  });
}

// Test code.
Promise_all([]).then(array => {
  console.log("This should be []:", array);
});
function soon(val) {
  return new Promise(resolve => {
    setTimeout(() => resolve(val), Math.random() * 500);
  });
}
Promise_all([soon(1), soon(2), soon(3)]).then(array => {
  console.log("This should be [1, 2, 3]:", array);
});
Promise_all([soon(1), Promise.reject("X"), soon(3)])
  .then(array => {
    console.log("We should not get here");
  })
  .catch(error => {
    if (error != "X") {
      console.log("Unexpected failure:", error);
    }
  });
