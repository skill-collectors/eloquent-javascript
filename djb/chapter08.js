/* Retry */
class MultiplicatorUnitFailure extends Error {}

function primitiveMultiply(a, b) {
  if (Math.random() < 0.2) {
    return a * b;
  } else {
    throw new MultiplicatorUnitFailure("Klunk");
  }
}

function reliableMultiply(a, b) {
  // Your code here.
  while(true) {
    try {
      return primitiveMultiply(a,b);
    } catch(err) {
      if(err instanceof MultiplicatorUnitFailure) {
        console.log(err);
      } else {
        throw err;
      }
    }
  }
}

console.log(reliableMultiply(8, 8));
// → 64

/* The locked box */
const box = {
  locked: true,
  unlock() { this.locked = false; },
  lock() { this.locked = true;  },
  _content: [],
  get content() {
    if (this.locked) throw new Error("Locked!");
    return this._content;
  }
};

function withBoxUnlocked(body) {
  // Your code here.
  let startedUnlocked = !box.locked;
  try {
    box.unlock();
    body();
  } finally {
    box.lock();
  }
  if(startedUnlocked) {
    box.unlock();
  }
}

withBoxUnlocked(function() {
  box.content.push("gold piece");
});
console.log(box.locked);
// → true

try {
  withBoxUnlocked(function() {
    throw new Error("Pirates on the horizon! Abort!");
  });
} catch (e) {
  console.log("Error raised: " + e);
}
console.log(box.locked);
// → true

box.unlock();
withBoxUnlocked(function() {
  box.content.push("gold piece");
});
console.log(box.locked);
// → false
