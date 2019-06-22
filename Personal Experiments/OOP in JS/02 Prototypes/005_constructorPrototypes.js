const myObj = {
  name: 'Zac',
  age: 32
};

// The proper way to get the prototype of an object is to use:
const myProto = Object.getPrototypeOf(myObj);
console.log(myProto);

// The result here ↑ is the same as when we go to the Chrome console and look in:
// myObj.__proto__

// So what we have here is the prototype (aka the parent of myObj).

////////////////////////////////////////////////////////////////////////////

// When we use an array literal or an object literal...
// const arr = [];
// const obj = {};
// under the hood we are calling the array or object constructor; example:
// const arr = new Array();
// const obj = new Object();

////////////////////////////////////////////////////////////////////////////

// The Array prototype is the object that includes all the array methods we're familiar with.
const arr = [];
const arrProto = Object.getPrototypeOf(arr);
console.log(arrProto);

// Here's another way to see the same thing:
console.log(Array.prototype);
