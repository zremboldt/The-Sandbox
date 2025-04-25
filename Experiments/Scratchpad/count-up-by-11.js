let count = 0;
let num = 0;

const counter = async () => {
  while (count < 100) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    console.log(`${count}: ${num}`);
    num += 11;
    count++;
  }
};

counter();
