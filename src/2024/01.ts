import fs from "fs";
import path from "path";

const main = () => {
  console.log("> start");
  const filePath = path.resolve(__dirname, "01.txt");
  const lines = fs
    .readFileSync(filePath, { encoding: "utf8" })
    .replaceAll("\r", "")
    .split("\n");
  // .slice(0, 10);

  const a: number[] = [];
  const b: number[] = [];

  for (const line of lines) {
    const split = line.split(" ");
    a.push(parseInt(split.at(0)));
    b.push(parseInt(split.at(-1)));
  }
  a.sort();
  b.sort();

  console.log(a);
  console.log(b);

  //   part1(a, b);

  // part2

  let score: number = 0;
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < b.length; j++) {
      if (a[i] === b[j]) {
        score += a[i];
      }
    }
  }

  console.log(score);
};

const part1 = (a: number[], b: number[]) => {
  const dist = a.map((val, idx) => Math.abs(val - b[idx]));
  console.log(dist);

  const sum = dist.reduce((sum, next) => sum + next);
  console.log(sum);
};

console.time("main");
main();
console.timeEnd("main");
