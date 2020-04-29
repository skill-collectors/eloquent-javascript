class GroupIterator {
  constructor(group) {
    this.group = group;
    this.index = 0;
  }

  next() {
    if (this.index < this.group.values.length) {
      return { value: this.group.values[this.index++], done: false };
    } else {
      return { done: true };
    }
  }
}
class Group {
  constructor() {
    this.values = [];
  }

  has(value) {
    return this.values.indexOf(value) >= 0;
  }

  add(value) {
    if (!this.has(value)) {
      this.values.push(value);
    }
  }

  delete(value) {
    this.values = this.values.filter(v => v != value);
  }

  [Symbol.iterator]() {
    return new GroupIterator(this);
  }

  static from(iterable) {
    const group = new Group()
    for (let value of iterable) {
      group.add(value);
    }
    return group;
  }
}

const group = Group.from([1, 2, 3]);
console.log(group);

group.add(2);
console.log(group);

group.add(4);
console.log(group);

group.delete(3)
console.log(group);

group.delete(7);
console.log(group);

for (let elem of group) {
  console.log(elem);
}
