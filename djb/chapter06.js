/* 6.1 a Vector type */
class Vec {
  constructor(x,y) {
    this.x = x;
    this.y = y;
  }
  
  plus(other) {
    return new Vec(this.x + other.x, this.y + other.y);
  }
  
  minus(other) {
    return new Vec(this.x - other.x, this.y - other.y);
  }
  
  get length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
}

console.log(new Vec(1, 2).plus(new Vec(2, 3)));
// → Vec{x: 3, y: 5}
console.log(new Vec(1, 2).minus(new Vec(2, 3)));
// → Vec{x: -1, y: -1}
console.log(new Vec(3, 4).length);
// → 5

/* 6.2 Groups */
class Group {
  constructor(items) {
    this.items = items || [];
  }
  static from(arr) {
    return new Group(arr);
  }
  
  has(x) {
    return this.items.includes(x);
  }
  
  add(x) {
    if(!this.has(x)) {
      this.items.push(x);
    }
  }
  
  delete(x) {
    const index = this.items.indexOf(x);
    if(typeof index !== 'undefined') { // At first I lazily used `if(index)` which returns `false` for zero.
      this.items.splice(index, 1);
    }
  }
}

let group = Group.from([10, 20]);
console.log(group.has(10));
// → true
console.log(group.has(30));
// → false

/* 6.3 Iterable Groups */
class GroupIterator {
  constructor(group) {
    this.i = 0;
    this.group = group;
  }
  
  next() {
    let value = this.group.items[this.i];
    this.i++;
    return { value, done: typeof value === 'undefined' }
  }
}
class Group {
  constructor(items) {
    this.items = items || [];
  }
  static from(arr) {
    return new Group(arr);
  }
  
  has(x) {
    return this.items.includes(x);
  }
  
  add(x) {
    if(!this.has(x)) {
      this.items.push(x);
    }
  }
  
  delete(x) {
    const index = this.items.indexOf(x);
    if(typeof index !== 'undefined') { // At first I lazily used `if(index)` which returns `false` for zero.
      this.items.splice(index, 1);
    }
  }
  
  [Symbol.iterator]() {
    return new GroupIterator(this);
  }
}

for (let value of Group.from(["a", "b", "c"])) {
  console.log(value);
}
// → a
// → b
// → c
group.add(10);
group.delete(10);
console.log(group.has(10));
// → false

/* 6.4 borrowing a method */
let map = {one: true, two: true, hasOwnProperty: true};

// The official solution uses `Object.prototype.hasOwnProperty`. Does that make a difference?
console.log(Object.hasOwnProperty.call(map, "one"));
// → true
