class PGroup {
  constructor(values) {
    this.values = values
  }

  add(value) {
    if (this.has(value)) {
      return this;
    } else {
      const vals = Array.from(this.values);
      vals.push(value);
      return new PGroup(vals);
    }
  }

  delete(value) {
    const vals = this.values.filter(v => v != value);
    return new PGroup(vals);
  }

  has(value) {
    return this.values.indexOf(value) >= 0;
  }

  static empty = new PGroup([])
}
