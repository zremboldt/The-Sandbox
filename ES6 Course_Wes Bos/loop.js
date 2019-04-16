// Video 004 - ES6 - Wes Bos

// Try var vs let for i

for (let i = 0; i < 10; i++) {
  console.log(i);
  setTimeout(() => {
    console.log("The number is " + i);
  }, 1000);
}
