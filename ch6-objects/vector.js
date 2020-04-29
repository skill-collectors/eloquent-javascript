class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  plus(that) {
    return new Vec(this.x + that.x, this.y + that.y);
  }

  minus(that) {
    return new Vec(this.x - that.x, this.y - that.y);
  }

  get length() {
    return this.x * this.x + this.y * this.y;
  }
}

console.log(new Vec(1, 2).plus(new Vec(3, 4)));

console.log(new Vec(1, 2).minus(new Vec(3, 4)));

console.log(new Vec(3, 4).length)
