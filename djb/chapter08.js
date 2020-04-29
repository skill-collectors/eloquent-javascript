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
