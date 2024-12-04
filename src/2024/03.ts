import fs from "fs";
import path from "path";

const main = () => {
  const filePath = path.resolve(__dirname, "03.txt");
  const text = fs.readFileSync(filePath, { encoding: "utf8" });

  const regex = /mul\((?<a>\d{1,3}),(?<b>\d{1,3})\)/gm;

  const p1 = part1(text, regex);
  console.log(`p1: ${p1}`);

  const splits = text.split(`do()`);
  console.log(splits.length);

  let sum = 0;

  for (let i = 0; i < splits.length; i++) {
    const dosplit = splits[i].split(`don't()`);
    sum += part1(dosplit[0], regex);
  }

  console.log(sum);
};

const part1 = (text: string, regex: RegExp): number => {
  let sum: number = 0;
  let m: RegExpExecArray;
  while ((m = regex.exec(text)) !== null) {
    sum += parseInt(m.groups.a) * parseInt(m.groups.b);
  }

  return sum;
};

console.time("main");
console.log("> start");
main();
console.timeEnd("main");
