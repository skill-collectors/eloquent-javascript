for (var num = 1; num <= 100; num++) {
  let divisible3 = num % 3 === 0
  let divisible5 = num % 5 === 0
  if (divisible3 && divisible5) {
    console.log("FizzBuzz");
  } else if (divisible3) {
    console.log("Fizz");
  } else if (divisible5) {
    console.log("Buzz");
  } else {
    console.log(num);
  }
}
