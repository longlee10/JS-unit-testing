// Lesson: Writing your first tests
export function max(a, b) {
  return b > a ? b : a;
}

// Exercise
export function fizzBuzz(n) {
  if (n % 3 === 0 && n % 5 === 0) return "FizzBuzz";
  if (n % 3 === 0) return "Fizz";
  if (n % 5 === 0) return "Buzz";
  return n.toString();
}

export function calculateAverage(numbers) {
  if (numbers.length === 0) return NaN;

  const sum = numbers.reduce((sum, current) => sum + current, 0);
  return sum / numbers.length;
}

export function factorial(number) {
  if (number < 0) return undefined;
  if (number === 0 || number === 1) return 1;

  let factorial = 1;
  for (let i = number; i > 1; i--) factorial *= i;

  return factorial;
}

// More exercise
// Reverse a string
/* 
  not a string -> Return message:  not a string
  empty string -> Return message "cannot reverse an empty string"
  string of length 1 -> Return the same
  otherwise -> reverse
*/
export function reverseString(text) {
  if (typeof text !== "string") return "Argument is not a string";

  if (text === "") return "Cannot reverse an empty string";

  let reversed = "";
  for (let i = text.length - 1; i >= 0; i--) reversed += text[i];

  return reversed;
}

// Find max in an array
export function maxNum(numbers) {
  if (!Array.isArray(numbers)) return "Not an array";

  if (numbers.length === 0) return "No maximum number";

  let max = numbers[0];
  for (let i = 0; i <= numbers.length; i++)
    if (numbers[i] > max) max = numbers[i];

  return max;
}
/* 
  not an array -> arg must be an array
  empty array -> no max num in an empty array
  array of 1 element -> return that only element
  array of n element -> return the max
 */

// Check palindrome
/* 
  not a number -> NaN
  a palindrome -> true
  not a palindrome -> false
*/
export function isPalindrome(number) {
  return typeof number !== "number" ? NaN : checkPalindrome(number);
}

function checkPalindrome(number) {
  let strNum = number.toString();
  let first = strNum.charAt(0);
  let last = strNum.charAt(strNum.length - 1);

  if (strNum.length <= 1) return true;

  if (first === last)
    return checkPalindrome(strNum.substring(1, strNum.length - 1));
  return false;
}
