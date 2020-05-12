// https://regexper.com/ is amazing

/* 9.1 Regex Golf */

// Fill in the regular expressions

//car and cat
verify(/ca[tr]/,
       ["my car", "bad cats"],
       ["camper", "high art"]);

// pop and prop
verify(/pr?op/,
       ["pop culture", "mad props"],
       ["plop", "prrrop"]);

// ferret, ferry, and ferrari
verify(/ferr(et|y|ari)/,
       ["ferret", "ferry", "ferrari"],
       ["ferrum", "transfer A"]);

// any word ending in ious
verify(/\w+ious\b/,
       ["how delicious", "spacious room"],
       ["ruinous", "consciousness"]);

// a whitespace character followed by a period, comma, colon, or semicolon
verify(/\s[.,:;]/,
       ["bad punctuation ."],
       ["escape the period"]);

// a word longer than six letters
verify(/\b\w{7,}\b/,
       ["hottentottententen"],
       ["no", "hotten totten tenten"]);

// a word without the letter e (or E)
verify(/\b[^e\s]+\b/i,
       ["red platypus", "wobbling nest"],
       ["earth bed", "learning ape", "BEET"]);


function verify(regexp, yes, no) {
  // Ignore unfinished exercises
  if (regexp.source == "...") return;
  for (let str of yes) if (!regexp.test(str)) {
    console.log(`Failure to match '${str}'`);
  }
  for (let str of no) if (regexp.test(str)) {
    console.log(`Unexpected match for '${str}' at ${regexp.exec(str).index}`);
  }
}

/* 9.2 Quoting Style */
let text = "'I'm the cook,' he said, 'it's my job.'";
console.log(text.replace(/(^|\W)'|'(\W|$)/g, '$1"$2')); // I looked at this answer
// → "I'm the cook," he said, "it's my job."

/* 9.3 Numbers again */
// Fill in this regular expression.
let number = /^[-+]?(\d\.?\d*|\d*\.\d)(e[-+]?\d+)?$/i;
// Official:   [+\-]?(\d+(\.\d*)?|\.\d+)([eE][+\-]?\d+)?

// Tests:
for (let str of ["1", "-1", "+15", "1.55", ".5", "5.", "1.3e2", "1E-4", "1e+12"]) {
  if (!number.test(str)) {
    console.log(`Failed to match '${str}'`);
  }
}
for (let str of ["1a", "+-1", "1.2.3", "1+1", "1e4.5", ".5.", "1f5", "."]) {
  if (number.test(str)) {
    console.log(`Incorrectly accepted '${str}'`);
  }
}
